/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"

import { zodValidatior } from "@/lib/zodValidation"
import { ICustomer } from "@/types/customer.interface"
import { customerValidationSchema } from "@/validations/customerValidation"
import { serverFetchDelete, serverFetchGet, serverFetchPatch, serverFetchPost } from "@/lib/server-fetch"



export const createCustomer = async (_prevState: any, formData: FormData) => {
    try {
        const payload: any = {
            name: formData.get("name") as string,
            email: formData.get("email") as string,
            contactNumber: formData.get("contactNumber") as string,
            presentAddress: formData.get("address") as string,
            gender: formData.get("gender") as "MALE" | "FEMALE",
            password: formData.get("password") as string,
        }

        console.log("Form payload:", payload)

        const validation = zodValidatior(payload, customerValidationSchema.createCustomer)
        if (validation.success === false) {
            console.log("Validation errors:", validation)
            return validation
        }

        const validatedPayload = validation.data
        if (!validatedPayload) {
            throw new Error("Invalid Payload")
        }

        const customer: any = {

            name: validatedPayload.name,
            email: validatedPayload.email,
            contactNumber: validatedPayload.contactNumber,
            presentAddress: validatedPayload.address,
            gender: validatedPayload.gender,
        }



        const newPayload = {
            password: validatedPayload.password,
            customer,
        }

        const newFormData = new FormData()
        newFormData.append("data", JSON.stringify(newPayload))

        if (formData.get("file")) {
            newFormData.append("file", formData.get("file") as Blob)
        }

        const response = await serverFetchPost("/user/create-customer", {
            body: newFormData,
        })
        const result = await response.json()
        return result
    } catch (error: any) {
        console.error("customer creation error:", error)
        return {
            success: false,
            message: error?.message || "Something went wrong",
        }
    }
}

export const getcustomers = async (queryStirng?: string) => {
    try {
        const endpoint = queryStirng ? `/customer${queryStirng}` : `/customer`;
        const response = await serverFetchGet(endpoint);
        const result = await response.json()
        console.log(result)
        return result
    } catch (error: any) {
        return {
            success: false,
            message:
                process.env.NODE_ENV === "development"
                    ? error.message
                    : "Something went wrong",
        };
    }
}

export const getSinglecustomers = async (id: string) => {
    try {
        const response = await serverFetchGet(`customer/${id}`);
        const result = await response.json()
        console.log({ result })
        return result
    } catch (error: any) {
        return {
            success: false,
            message:
                process.env.NODE_ENV === "development"
                    ? error.message
                    : "Something went wrong",
        };
    }
}

export const updatecustomer = async (id: string, _prevState: any, formData: FormData) => {
    try {
        const payload: Partial<ICustomer & { password?: string }> = {
            name: formData.get("name") as string,
            email: formData.get("email") as string,
            contactNumber: formData.get("contactNumber") as string,
            presentAddress: formData.get("address") as string,
            gender: formData.get("gender") as "MALE" | "FEMALE",
            profilePhoto: formData.get("profilePhoto") as string,
            password: formData.get("password") as string,
        }

        const validatedPayload = zodValidatior(payload, customerValidationSchema.updateCustomer).data

        if (!validatedPayload) {
            throw new Error("Invalid Payload")
        }

        const response = await serverFetchPatch(`/customer/${id}`, {
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(validatedPayload)
        })
        const result = await response.json()
        console.log({ result })
        return result

    } catch (error: any) {
        console.error("customer update error:", error)
        return {
            success: false,
            message: error?.message || "Something went wrong",
        };
    }
}

export const deletecustomers = async (id: string) => {
    try {
        const response = await serverFetchPost(`/customer/${id}`)
        const result = await response.json()
        console.log({ result })
        return result
    } catch (error: any) {
        return {
            success: false,
            message:
                process.env.NODE_ENV === "development"
                    ? error.message
                    : "Something went wrong",
        };
    }
}

export const softDeltecustomers = async (id: string) => {
    try {
        const response = await serverFetchDelete(`/customer/soft-delete/${id}`)
        const result = await response.json()
        console.log({ result })
        return result
    } catch (error: any) {
        return {
            success: false,
            message:
                process.env.NODE_ENV === "development"
                    ? error.message
                    : "Something went wrong",
        };
    }
}