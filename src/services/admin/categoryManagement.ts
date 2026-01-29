/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"

import { zodValidatior } from "@/lib/zodValidation";
import { createCategoryValdationSchema } from "@/validations/categoryValidation";
import { serverFetchDelete, serverFetchGet, serverFetchPost } from "../../lib/server-fetch";


export async function createCategory(_prevState: any, formData: FormData) {
    try {
        const payload = {
            title: formData.get("title") as string,
        };

        if (zodValidatior(payload, createCategoryValdationSchema).success === false) {
            return zodValidatior(payload, createCategoryValdationSchema);
        }

        const validatedPayload = zodValidatior(payload, createCategoryValdationSchema).data;

        const newFormData = new FormData();
        newFormData.append("data", JSON.stringify(validatedPayload));

        if (formData.get("file")) {
            newFormData.append("file", formData.get("file") as Blob)
        }

        const response = await serverFetchPost(
            "/category/create-category",
            { body: newFormData }
        );

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Failed to create category: ${errorData?.message || response.statusText}`);
        }

        const result = await response.json();

        return JSON.parse(JSON.stringify(result));

    } catch (err: any) {
        console.error(err);
        return {
            success: false,
            message:
                process.env.NODE_ENV === "development"
                    ? err.message
                    : "Something went wrong",
        };
    }
}

export async function getCategory() {
    try {
        const response = await serverFetchGet("/category")
        return await response.json()
    } catch (err: any) {
        console.error(err);
        return {
            success: false,
            message:
                process.env.NODE_ENV === "development"
                    ? err.message
                    : "Something went wrong",
        };
    }
}

export async function deleteCategory(id: string) {
    try {
        const response = await serverFetchDelete(`/category/${id}`);

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Failed to delete category: ${errorData?.message || response.statusText}`);
        }

        return await response.json();
    } catch (err: any) {
        console.log(err)
        console.error(err);
        return {
            success: false,
            message:
                process.env.NODE_ENV === "development"
                    ? err.message
                    : "Something went wrong",
        };
    }
}
