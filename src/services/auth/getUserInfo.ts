
/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"

import { getCookie } from "./jwtHendeler";
import jwt, { JwtPayload } from "jsonwebtoken";
import { UserInfo } from "@/types/userInfo.interface";
import { redirect } from "next/navigation";

export const getUserInfo = async (): Promise<UserInfo | any> => {
    try {
        const accessToken = await getCookie("accessToken");

        if (!accessToken) {
            redirect("/");
        }

        const decoded = jwt.decode(accessToken) as JwtPayload | null;

        let verifiedToken: JwtPayload;
        try {
            verifiedToken = jwt.verify(accessToken, process.env.JWT_SECRET as string) as JwtPayload;
        } catch (verifyError: any) {
            console.log("JWT verify error:", verifyError);
            redirect("/");
        }

        if (verifiedToken.role && verifiedToken.role !== "ADMIN") {
            redirect("/");
        }

        const userInfo: UserInfo | any = {
            name: verifiedToken.name || decoded?.name || "Unknown User",
            email: verifiedToken.email || decoded?.email || "",
            role: verifiedToken.role || decoded?.role || "CUSTOMER",
            ...(decoded || {}),
        };

        return userInfo;
    } catch (error: any) {
        console.log(error);
        redirect("/");
    }
}