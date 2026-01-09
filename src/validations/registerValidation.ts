/* eslint-disable @typescript-eslint/no-explicit-any */
import z from "zod";

export const registerValidationZodSchema = z.object({
    name: z.string().min(1, { message: "Name is required" }),
    contactNumber: z.string().min(1, { message: "Contact number is required" }),
    presentAddress: z.string().min(1, { message: "Address is required" }),
    email: z.string().email({ message: "Valid email is required" }),
    password: z.string().min(6, {
        message: "Password is required and must be at least 6 characters long",
    }).max(100, {
        message: "Password must be at most 100 characters long",
    }),
});