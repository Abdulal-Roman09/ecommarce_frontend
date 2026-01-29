/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"

import { IVendor } from "@/types/vendor.interfac"
import { zodValidatior } from "@/lib/zodValidation"
import { serverFetchPost } from "@/lib/server-fetch"
import { vendorValidationSchema } from "@/validations/vendorValidation"


export const createVendor = async (_prevState: any, formData: FormData) => {
    try {
        const payload: IVendor = {
            name: formData.get("name") as string,
            email: formData.get("email") as string,
            contactNumber: formData.get("contactNumber") as string,
            address: formData.get("address") as string,
            gender: formData.get("gender") as "MALE" | "FEMELE",
            profilePhoto: formData.get(" profilePhoto") as string,
            password: formData.get(" password") as string,
        }
        if (zodValidatior(payload, vendorValidationSchema.createVendor).success === false) {
            return zodValidatior(payload, vendorValidationSchema.createVendor)
        }
        const validatedPayload = zodValidatior(payload, vendorValidationSchema.createVendor).data

        if (!validatedPayload) {
            throw new Error("Invalid Payload")
        }
        const newPayload = {
            password: validatedPayload.password,
            vendor: {
                name: validatedPayload.name,
                email: validatedPayload.email,
                contactNumber: validatedPayload.contactNumber,
                address: validatedPayload.address,
                gender: validatedPayload.gender,
                profilePhoto: validatedPayload.profilePhoto,
            }
        }
        const newFormData = new FormData()
        newFormData.append("data", JSON.stringify(newPayload))

        if (formData.get("file")) {
            newFormData.append("file", formData.get("file") as Blob)
        }

        const response = await serverFetchPost("/user/create-vendor", {
            body: newFormData
        })
        const result = await response.json()
        console.log({ result })

    } catch (error) {
        console.log(error)
    }
}

export const getVendors = async (queryStirng?: string) => {
    try {
        const response = await serverFetchPost(`/vendor${queryStirng}:""`)
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

export const getSingleVendors = async (id: string) => {
    try {
        const response = await serverFetchPost(`/vendor/${id}:""`)
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
        const payload: Partial<IVendor> = {
            name: formData.get("name") as string,
            email: formData.get("email") as string,
            contactNumber: formData.get("contactNumber") as string,
            address: formData.get("address") as string,
            gender: formData.get("gender") as "MALE" | "FEMELE",
            profilePhoto: formData.get(" profilePhoto") as string,
            password: formData.get(" password") as string,
        }
        if (zodValidatior(payload, vendorValidationSchema.updateVendor).success === false) {
            return zodValidatior(payload, vendorValidationSchema.updateVendor)
        }
        const validatedPayload = zodValidatior(payload, vendorValidationSchema.updateVendor).data

        if (!validatedPayload) {
            throw new Error("Invalid Payload")
        }

        const newFormData = new FormData()
        newFormData.append("data", JSON.stringify(validatedPayload))

        if (formData.get("file")) {
            newFormData.append("file", formData.get("file") as Blob)
        }

        const response = await serverFetchPost(`/doctor/${id}`, {
            body: newFormData
        })
        const result = await response.json()
        console.log({ result })

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
        const response = await serverFetchPost(`/vendor/soft/${id}`)
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