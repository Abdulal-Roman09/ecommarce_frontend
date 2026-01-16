/* eslint-disable @typescript-eslint/no-explicit-any */

import z from "zod";
import { serverFetchDelete, serverFetchGet, serverFetchPost } from "../../lib/server-fetch";
import { zodValidatior } from "@/lib/zodValidation";


const createCategoryValdationSchema = z.object({
    title: z.string().min(3, "Title must be at least 3 characters"),
});

export async function createCategory(_prevState: any, formData: FormData) {
    try {
        const payload = {
            title: formData.get("title") as string,
        };

        const validationResult = zodValidatior(
            payload,
            createCategoryValdationSchema
        );

        if (!validationResult.success) {
            return {
                success: false,
                errors: validationResult.errors ?? null,
            };
        }

        const newFormData = new FormData();
        newFormData.append(
            "data",
            JSON.stringify(validationResult.data)
        );

        const file = formData.get("file");
        if (file instanceof File) {
            newFormData.append("file", file);
        }

        const response = await serverFetchPost(
            "/category/create-category",
            { body: newFormData }
        );

        if (!response.ok) {
            throw new Error("Failed to create category");
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
            throw new Error("Failed to delete category");
        }

        return await response.json();
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
