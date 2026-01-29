import { z } from "zod";

export const createVendor = z.object({
    password: z
        .string()
        .min(6, "Password must contain at least 6 characters"),

    vendor: z.object({
        name: z.string().trim().min(1, "Full name is required"),
        email: z.string().trim().email("Please enter a valid email address"),
        contactNumber: z.string().min(1, "Contact number is required"),
        address: z.string().min(1, "Address is required"),
        gender: z.enum(["MALE", "FEMALE"], {
            message: "Please select either MALE or FEMALE"
        }),
        profilePhoto: z.string().url("Invalid image URL").optional(),
    }),
});

export const updateVendor = z.object({
    password: z.string().min(6, "Password must contain at least 6 characters").optional(),
    vendor: z.object({
        name: z.string().trim().min(1).optional(),
        contactNumber: z.string().min(1).optional(),
        address: z.string().min(1).optional(),
        gender: z.enum(["MALE", "FEMALE"], {
            message: "Please select either MALE or FEMALE"
        }).optional(),
        profilePhoto: z.string().url().optional(),
    })
        .optional(),
});

export const vendorValidationSchema = {
    createVendor,
    updateVendor
}