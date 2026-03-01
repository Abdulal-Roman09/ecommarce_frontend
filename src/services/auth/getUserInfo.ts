/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { getCookie } from "./jwtHendeler";
import jwt, { JwtPayload } from "jsonwebtoken";
import { UserInfo } from "@/types/userInfo.interface";
import { redirect } from "next/navigation";
import { serverFetchGet } from "@/lib/server-fetch";

export const getUserInfo = async (): Promise<UserInfo> => {
    const accessToken = await getCookie("accessToken");

    if (!accessToken) {
        redirect("/");
    }

    let verifiedToken: JwtPayload;

    try {
        verifiedToken = jwt.verify(
            accessToken,
            process.env.JWT_SECRET as string
        ) as JwtPayload;
    } catch (error) {
        console.log("JWT verify error:", error);
        redirect("/");
    }

    const userId = verifiedToken.id;

    if (!userId) {
        redirect("/");
    }

    try {
        const response = await serverFetchGet(`/user/${userId}`, {
            cache: "force-cache",
            next: { tags: ["UserInfo"] }
        });
        const result = await response.json();

        if (!result.success) {
            throw new Error(result.message);
        }
        const name =
            result?.admin?.name ||
            result?.data?.customer?.name ||
            result?.data?.vendor?.name ||
            "Unknown User";
        const profilePhoto =
            result?.admin?.profilePhoto ||
            result?.data?.customer?.profilePhoto ||
            result?.data?.vendor?.profilePhoto ||
            "Unknown User";

        const userInfo: UserInfo = {
            name,
            profilePhoto,
            ...result.data
        };

        return userInfo
    } catch (error: any) {
        console.error("Fetch user error:", error);
        const data: any = {
            name: verifiedToken.name || "Unknown User",
            email: verifiedToken.email || "",
            role: verifiedToken.role || "CUSTOMER"
        }
        return data
    }
};