/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"

import { registerValidationZodSchema } from "@/validations/registerValidation"



export const RegisterCustomer = async (_currentState: any, formData: any): Promise<any> => {
    try {
        const validationData = {
            password: formData.get("password"),
            name: formData.get("name"),
            email: formData.get("email"),
            contactNumber: formData.get("contactNumber"),
            presentAddress: formData.get("presentAddress")
        }

        const validationFields = registerValidationZodSchema.safeParse(validationData)

        if (!validationFields.success) {
            return {
                success: false,
                errors: validationFields.error.issues.map(issue => {
                    return {
                        field: issue.path[0],
                        message: issue.message
                    }
                })
            }
        }

        const registerData = {
            password: formData.get("password"),
            customer: {
                name: formData.get("name"),
                email: formData.get("email"),
                contactNumber: formData.get("contactNumber"),
                presentAddress: formData.get("presentAddress")
            }
        };

        const newFormData = new FormData();
        newFormData.append('data', JSON.stringify(registerData));

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/create-customer`, {
            method: "POST",
            body: newFormData,
            cache: 'no-store'
        });

        const data = await res.json();

        console.log(data, "data");
        return data;

    } catch (err: any) {
        console.log(err);
        return {
            success: false,
            message: err.message || "Registration failed"
        };
    }
}