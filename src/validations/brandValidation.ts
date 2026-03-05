import { z } from "zod";

const createBrand = z.object({
    name: z.string().min(1, "Invalid brand data"),
    slug: z.string(),
    logo: z.string(),
    description: z.string(),
    vendorId: z.string().uuid("Invalid brand data"),
});

const updateBrand = z.object({
    name: z.string().optional(),
    slug: z.string().optional(),
    logo: z.string().optional(),
    description: z.string().optional(),
    vendorId: z.string().uuid().optional(),
});

export const BrandValidationSchema = {
    createBrand,
    updateBrand,
};