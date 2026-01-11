/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"

import { UserInfo } from "@/types/userInfo.interface"
import { getCookie } from "./jwtHendeler"
import jwt, { JwtPayload } from 'jsonwebtoken'


export const getUserInfo = async (): Promise<UserInfo | null> => {
    try {
        const accessToken = await getCookie("accessToken")
        const verifyedToken = jwt.verify(accessToken as string, process.env.JWT_SECRET as string) as JwtPayload

        if (!accessToken) {
            return null
        }
        const userInfo: UserInfo = {
            id: verifyedToken.id,
            email: verifyedToken.email,
            role: verifyedToken.role
        }
        return userInfo
    } catch (error: any) {
        console.log(error)
        return null
    }
}
