/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"

import { zodValidatior } from "@/lib/zodValidation"
import { BrandValidationSchema } from "@/validations/brandValidation"
import { serverFetchDelete, serverFetchGet, serverFetchPatch, serverFetchPost } from "@/lib/server-fetch"
import { revalidatePath } from "next/cache"

export const createBrand = async (_prevState: any, formData: FormData) => {
    try {
        const payload = {
            name: formData.get("name") as string,
            slug: formData.get("slug") as string,
            description: formData.get("description") as string,
            vendorId: formData.get("vendorId") as string,
            logo: formData.get("logo") as string || "",
        }

        // Validate payload using Zod
        const validation = zodValidatior(payload, BrandValidationSchema.createBrand)

        if (validation.success === false) {
            return validation
        }

        const validatedData = validation.data

        // Preparing FormData for multipart upload (if your backend requires it)
        const newFormData = new FormData()
        newFormData.append("data", JSON.stringify(validatedData))

        // Check if a physical file was uploaded
        const file = formData.get("file")
        if (file instanceof File && file.size > 0) {
            newFormData.append("file", file)
        }

        const response = await serverFetchPost("/brand", {
            body: newFormData,
        })

        const result = await response.json()

        if (result.success) {
            revalidatePath("/admin/brands") // Clear cache for brand list
        }

        return result
    } catch (error: any) {
        console.error("Brand creation error:", error)
        return {
            success: false,
            message: error?.message || "Something went wrong during brand creation",
        }
    }
}

export const getBrands = async (queryString?: string) => {
    try {
        const endpoint = queryString ? `/brand${queryString}` : `/brand`
        const response = await serverFetchGet(endpoint)
        return await response.json()
    } catch (error: any) {
        return {
            success: false,
            message: process.env.NODE_ENV === "development" ? error.message : "Failed to fetch brands",
        }
    }
}

export const getSingleBrand = async (id: string) => {
    try {
        const response = await serverFetchGet(`/brand/${id}`)
        return await response.json()
    } catch (error: any) {
        return {
            success: false,
            message: "Failed to fetch brand details",
        }
    }
}

export const updateBrand = async (id: string, _prevState: any, formData: FormData) => {
    try {
        const payload = {
            name: formData.get("name") as string,
            slug: formData.get("slug") as string,
            description: formData.get("description") as string,
            vendorId: formData.get("vendorId") as string,
        }

        // Validate payload
        const validation = zodValidatior(payload, BrandValidationSchema.updateBrand)

        if (!validation.success) {
            return validation
        }

        // Logic for handling file update in PATCH
        const newFormData = new FormData()
        newFormData.append("data", JSON.stringify(validation.data))

        const file = formData.get("file")
        if (file instanceof File && file.size > 0) {
            newFormData.append("file", file)
        }

        const response = await serverFetchPatch(`/brand/${id}`, {
            body: newFormData,
        })

        const result = await response.json()

        if (result.success) {
            revalidatePath("/admin/brands")
        }

        return result
    } catch (error: any) {
        console.error("Brand update error:", error)
        return {
            success: false,
            message: error?.message || "Something went wrong while updating brand",
        }
    }
}

export const deleteBrand = async (id: string) => {
    try {
        const response = await serverFetchDelete(`/brand/${id}`)
        const result = await response.json()
        revalidatePath("/admin/brands")
        return result
    } catch (error: any) {
        return {
            success: false,
            message: "Failed to delete brand",
        }
    }
}

/**
 * Action for soft deletion
 */
export const softDeleteBrand = async (id: string) => {
    try {
        const response = await serverFetchDelete(`/brand/soft-delete/${id}`)
        const result = await response.json()
        revalidatePath("/admin/brands")
        return result
    } catch (error: any) {
        return {
            success: false,
            message: "Failed to soft delete brand",
        }
    }
}