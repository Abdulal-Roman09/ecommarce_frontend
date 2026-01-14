/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"

import { parse } from "cookie"
import { loginValidationZodSchema } from "@/validations/loginValidation"
import jwt, { JwtPayload } from 'jsonwebtoken'
import { redirect } from "next/navigation"
import { getDefaultDashboardRoutes, isValidRediretForRole, UserRole } from "@/lib/auth-utils"
import { setCookie } from "./jwtHendeler"
import { serverFetchPost } from "./server-fetch"



export const loginCustomer = async (_currentState: any, formData: FormData): Promise<any> => {
    try {

        const redirectTo = formData.get("redirect")

        const loginData = {
            email: formData.get("email"),
            password: formData.get("password"),
        }

        const validationFields = loginValidationZodSchema.safeParse(loginData)

        if (!validationFields.success) {
            return {
                success: false,
                errors: validationFields.error.issues.map(issue => ({
                    field: issue.path[0],
                    message: issue.message,
                })),
            }
        }

        const res = await serverFetchPost(`/auth/login`, {
            body: JSON.stringify(loginData),
            headers:{
                "Content-Type":"application/json"
            }
        })

        const result = await res.json()

        if (!res.ok) {
            return {
                success: false,
                message: result.message || "Login failed",
            }
        }

        const accessToken = result?.data?.accessToken
        if (!accessToken) {
            throw new Error("Access token not found in response body")
        }

        let refreshTokenObject: any = null

        const setCookieHeaders = res.headers.getSetCookie()

        if (setCookieHeaders && setCookieHeaders.length > 0) {
            setCookieHeaders.forEach((cookie: string) => {
                const parsedCookie = parse(cookie)
                if (parsedCookie.refreshToken) {
                    refreshTokenObject = parsedCookie
                }
            })
        }

        if (!refreshTokenObject) {
            throw new Error("Refresh token not found in cookies")
        }

        await setCookie("accessToken", accessToken, {
            httpOnly: true,
            secure: true,
            sameSite: "lax",
            path: "/",
            maxAge: 60 * 60,
        })

        await setCookie("refreshToken", refreshTokenObject.refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: "lax",
            path: "/",
            maxAge: 60 * 60 * 24 * 90,
        })

        const verifyedToken: JwtPayload | string = jwt.verify(accessToken, process.env.JWT_SECRET as string)

        if (typeof verifyedToken === 'string') {
            throw new Error("Invalid Token")
        }

        const userRole: UserRole = verifyedToken.role
        if (!result.success) {
            const message =
                process.env.NODE_ENV === "development"
                    ? result.message
                    : "Login failed";

            throw new Error(message);
        }


        if (redirectTo) {
            const requestedPath = redirectTo.toString();
            if (isValidRediretForRole(requestedPath, userRole)) {
                redirect(`${requestedPath}?loggedIn=true`);
            } else {
                redirect(`${getDefaultDashboardRoutes(userRole)}?loggedIn=true`);
            }
        } else {
            redirect(`${getDefaultDashboardRoutes(userRole)}?loggedIn=true`);
        }


    } catch (err: any) {
        if (err?.digest?.startsWith('NEXT_REDIRECT')) {
            throw err
        }
        return {
            success: false,
            message:
                process.env.NODE_ENV === "development"
                    ? err instanceof Error
                        ? err.message
                        : "Unknown error"
                    : "Login failed",
        };

    }
}
