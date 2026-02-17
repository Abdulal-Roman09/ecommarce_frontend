/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"

import { IVendor } from "@/types/vendor.interfac"
import { zodValidatior } from "@/lib/zodValidation"
import { vendorValidationSchema } from "@/validations/vendorValidation"
import { serverFetchPost, serverFetchGet, serverFetchDelete, serverFetchPatch } from "@/lib/server-fetch"


export const createVendor = async (_prevState: any, formData: FormData) => {
    try {
        const categoryIdsString = formData.get("categoryIds") as string
        const categoryIds = categoryIdsString ? JSON.parse(categoryIdsString) : undefined

        const payload: any = {
            name: formData.get("name") as string,
            email: formData.get("email") as string,
            contactNumber: formData.get("contactNumber") as string,
            address: formData.get("address") as string,
            gender: formData.get("gender") as "MALE" | "FEMALE",
            password: formData.get("password") as string,
        }

        if (categoryIds) {
            payload.categoryIds = categoryIds
        }

        console.log("Form payload:", payload)

        const validation = zodValidatior(payload, vendorValidationSchema.createVendor)
        if (validation.success === false) {
            console.log("Validation errors:", validation)
            return validation
        }

        const validatedPayload = validation.data
        if (!validatedPayload) {
            throw new Error("Invalid Payload")
        }

        const vendor: any = {
            name: validatedPayload.name,
            email: validatedPayload.email,
            contactNumber: validatedPayload.contactNumber,
            address: validatedPayload.address,
            gender: validatedPayload.gender,
        }

        if (validatedPayload.categoryIds) {
            vendor.categoryIds = validatedPayload.categoryIds
        }

        const newPayload = {
            password: validatedPayload.password,
            vendor,
        }

        const newFormData = new FormData()
        newFormData.append("data", JSON.stringify(newPayload))

        if (formData.get("file")) {
            newFormData.append("file", formData.get("file") as Blob)
        }

        const response = await serverFetchPost("/user/create-vendor", {
            body: newFormData,
        })
        const result = await response.json()
        return result
    } catch (error: any) {
        console.error("Vendor creation error:", error)
        return {
            success: false,
            message: error?.message || "Something went wrong",
        }
    }
}

export const getVendors = async (queryStirng?: string) => {
    try {
        const endpoint = queryStirng ? `/vendor${queryStirng}` : `/vendor`;
        const response = await serverFetchGet(endpoint);
        const result = await response.json()
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

export const getSingleVendors = async (id: string) => {
    try {
        const response = await serverFetchGet(`/vendor/${id}`);
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

export const updateVendor = async (id: string, _prevState: any, formData: FormData) => {
    try {
        const payload: Partial<IVendor & { password?: string }> = {
            name: formData.get("name") as string,
            email: formData.get("email") as string,
            contactNumber: formData.get("contactNumber") as string,
            address: formData.get("address") as string,
            gender: formData.get("gender") as "MALE" | "FEMALE",
            profilePhoto: formData.get("profilePhoto") as string,
            password: formData.get("password") as string,
        }

        const validatedPayload = zodValidatior(payload, vendorValidationSchema.updateVendor).data

        if (!validatedPayload) {
            throw new Error("Invalid Payload")
        }

        const response = await serverFetchPatch(`/vendor/${id}`, {
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(validatedPayload)
        })
        const result = await response.json()
        console.log({ result })
        return result

    } catch (error: any) {
        console.error("Vendor update error:", error)
        return {
            success: false,
            message: error?.message || "Something went wrong",
        };
    }
}

export const deleteVendors = async (id: string) => {
    try {
        const response = await serverFetchPost(`/vendor/${id}`)
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

export const softDelteVendors = async (id: string) => {
    try {
        const response = await serverFetchDelete(`/vendor/soft-delete/${id}`)
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