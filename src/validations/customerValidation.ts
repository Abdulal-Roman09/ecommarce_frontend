import { z } from "zod";

const createCustomer = z.object({
    password: z.string().min(6, "Password must be at least 6 characters"),
    customer: z.object({
        name: z.string().nonempty("Name is required!"),
        email: z.string().email("Invalid email address!"),
        contactNumber: z.string().nonempty("Contact Number is required!"),
        presentAddress: z.string().nonempty("Present address is required!"),
        profilePhoto: z.string().optional(),
    }),
})

export const updateCustomer = z.object({
    password: z.string().min(6, "Password must contain at least 6 characters").optional(),
    Customer: z.object({
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

export const customerValidationSchema = {
    createCustomer,
    updateCustomer
}