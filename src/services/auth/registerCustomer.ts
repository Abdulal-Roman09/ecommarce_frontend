/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"

import { registerValidationZodSchema } from "@/validations/registerValidation"
import { loginCustomer } from "./loginCustomer"
import { serverFetch } from "./server-fetch"



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

        const res = await serverFetch.post(`${process.env.NEXT_PUBLIC_API_URL}/user/create-customer`, {
            body: newFormData,
        });

        const result = await res.json()

        if (result.success) {
            await loginCustomer(_currentState, formData)
        }

        return result

    } catch (err: any) {

        if (err?.digest?.startsWith('NEXT_REDIRECT')) {
            throw err
        }
        console.log(err);
        return {
            success: false,
            message:
                process.env.NODE_ENV === "development"
                    ? err instanceof Error
                        ? err.message
                        : "Unknown error"
                    : "Login failed",
        };

    }
}