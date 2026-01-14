/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"

import { registerValidationZodSchema } from "@/validations/registerValidation"
import { loginCustomer } from "./loginCustomer"
import { serverFetchPost } from "../../lib/server-fetch"
import { zodValidatior } from "@/lib/zodValidation"


export const RegisterCustomer = async (_currentState: any, formData: any): Promise<any> => {
    try {
        const payload = {
            password: formData.get("password"),
            name: formData.get("name"),
            email: formData.get("email"),
            contactNumber: formData.get("contactNumber"),
            presentAddress: formData.get("presentAddress")
        }

        // const validationFields = registerValidationZodSchema.safeParse(validationData)

        // if (!validationFields.success) {
        //     return {
        //         success: false,
        //         errors: validationFields.error.issues.map(issue => {
        //             return {
        //                 field: issue.path[0],
        //                 message: issue.message
        //             }
        //         })
        //     }
        // }
        if (zodValidatior(payload, registerValidationZodSchema).success === false) {
            return zodValidatior(payload, registerValidationZodSchema)
        }
        const validatedPayload: any = zodValidatior(payload, registerValidationZodSchema).data

        const registerData = {
            password: validatedPayload.password,
            customer: {
                name: validatedPayload.name,
                email: validatedPayload.email,
                contactNumber: validatedPayload.contactNumber,
                presentAddress: validatedPayload.presentAddress
            }
        };

        const newFormData = new FormData();
        newFormData.append('data', JSON.stringify(registerData));

        if (formData.get("file")) {
            newFormData.append("file", formData.get("file") as Blob)
        }

        const res = await serverFetchPost(`/user/create-customer`, {
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