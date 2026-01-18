import z from "zod";

export const createCategoryValdationSchema = z.object({
    title: z.string().min(2, "Title must be at least 2 characters"),
});