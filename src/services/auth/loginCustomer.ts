/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"

import { parse } from "cookie";
import { cookies } from "next/headers";
import { loginValidationZodSchema } from "@/validations/loginValidation";


export const loginCustomer = async (_currentState: any, formData: FormData): Promise<any> => {
    try {
        let accessTokenObject: any = null;
        let refreshTokenObject: any = null;

        const loginData = {
            email: formData.get("email"),
            password: formData.get("password")
        }

        const validationFields = loginValidationZodSchema.safeParse(loginData)

        if (!validationFields.success) {
            return {
                success: false,
                errors: validationFields.error.issues.map(issue => ({
                    field: issue.path[0],
                    message: issue.message
                }))
            }
        }

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
            method: "POST",
            body: JSON.stringify(loginData),
            headers: {
                "Content-Type": "application/json"
            }
        })

        const result = await res.json()

        if (!res.ok) {
            return { success: false, message: result.message || "Login failed" };
        }

        const setCookieHeaders = res.headers.getSetCookie()

        if (setCookieHeaders && setCookieHeaders.length > 0) {
            setCookieHeaders.forEach((cookie: string) => {
                const parsedCookie = parse(cookie)
                if (parsedCookie['accessToken']) {
                    accessTokenObject = parsedCookie
                }
                if (parsedCookie['refreshToken']) {
                    refreshTokenObject = parsedCookie
                }
            })
        } else {
            throw new Error("No Set-Cookie header found from server")
        }

        if (!accessTokenObject || !refreshTokenObject) {
            throw new Error("Tokens not found in server response")
        }

        const cookieStore = await cookies()

        cookieStore.set("accessToken", accessTokenObject.accessToken, {
            secure: true,
            httpOnly: true,
            maxAge: parseInt(accessTokenObject['Max-Age']) || 3600,
            path: accessTokenObject.Path || "/",
            sameSite: "lax"
        })

        cookieStore.set("refreshToken", refreshTokenObject.refreshToken, {
            secure: true,
            httpOnly: true,
            maxAge: parseInt(refreshTokenObject['Max-Age']) || 7776000,
            path: refreshTokenObject.Path || "/",
            sameSite: "lax"
        })

        return result

    } catch (err: any) {
        console.error("Login Error:", err);
        return { success: false, error: err.message || "Something went wrong" };
    }
}