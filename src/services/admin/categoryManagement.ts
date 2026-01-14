/* eslint-disable @typescript-eslint/no-explicit-any */

import z from "zod";
import { serverFetch } from "../auth/server-fetch";

const createCategoryValdationSchema = z.object({
    title: z.string().min(3, "Title must be at least 3 characters"),
});

export async function createCategory(_prevState: any, formData: FormData) {
    try {
        const payload = {
            title: formData.get("title") as string,
        };

        const validated = createCategoryValdationSchema.safeParse(payload);

        if (!validated.success) {
            return {
                success: false,
                errors: validated.error.issues.map((issue) => ({
                    field: issue.path[0],
                    message: issue.message,
                })),
            };
        }

        const newFormData = new FormData();

        newFormData.append("data", JSON.stringify(validated.data));

        const file = formData.get("file");
        if (file instanceof Blob) {
            newFormData.append("file", file);
        }

        const response = await serverFetch.post("/category/create-category", {
            body: newFormData,
        });

        if (!response.ok) {
            throw new Error("Failed to create category");
        }

        const result = await response.json();
        return result;

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
        const response = await serverFetch.get("/category")
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
        const response = await serverFetch.delete(`/category/${id}`);

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
