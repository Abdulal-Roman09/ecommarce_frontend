/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"

import { serverFetchGet } from "@/lib/server-fetch";
import { getCookie } from "./jwtHendeler";
import jwt, { JwtPayload } from "jsonwebtoken";
import { UserInfo } from "@/types/userInfo.interface";


export const getUserInfo = async (): Promise<UserInfo | any> => {
    let userInfo: UserInfo | any;
    try {

        const response = await serverFetchGet("/auth/get-me", {
            next: { tags: ["user-info"], revalidate: 180 },

        })

        const result = await response.json();
        console.log(result)

        if (result.success) {
            const accessToken = await getCookie("accessToken");

            if (!accessToken) {
                throw new Error("No access token found");
            }

            const verifiedToken = jwt.verify(accessToken, process.env.JWT_SECRET as string) as JwtPayload

            userInfo = {
                name: verifiedToken.name || "Unknown User",
                email: verifiedToken.email,
                role: verifiedToken.role,
            }
        }

        userInfo = {
            name: result.data.admin?.name || result.data.vendor?.name || result.data.customer?.name || result.data.name || "Unknown User",
            ...result.data
        };



        return userInfo;
    } catch (error: any) {
        console.log(error);
        return {
            id: "",
            name: "Unknown User",
            email: "",
            role: "CUSTOMER",
        };
    }

}