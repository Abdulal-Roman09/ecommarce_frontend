/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"

import { parse } from "cookie"
import { loginValidationZodSchema } from "@/validations/loginValidation"
import jwt, { JwtPayload } from 'jsonwebtoken'
import { redirect } from "next/navigation"
import { getDefaultDashboardRoutes, isValidRediretForRole, UserRole } from "@/lib/auth-utils"
import { setCookie } from "./jwtHendeler"


export const loginCustomer = async (_currentState: any, formData: FormData): Promise<any> => {
    try {

        const redirectTo = formData.get("redirect")
        console.log("redireact :", redirectTo)

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

        const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(loginData),
            }
        )

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
            throw new Error(result.message || "Login failed");
        }

        if (redirectTo) {
            const requestedPath = redirectTo.toString()

            if (isValidRediretForRole(requestedPath, userRole)) {
                redirect(requestedPath)
            } else {
                redirect(getDefaultDashboardRoutes(userRole))
            }
        } else {
            redirect(getDefaultDashboardRoutes(userRole))
        }


    } catch (err: any) {
        if (err?.digest?.startsWith('NEXT_REDIRECT')) {
            throw err
        }
        return {
            success: false,
            error: err.message || "Something went wrong",
        }
    }
}
