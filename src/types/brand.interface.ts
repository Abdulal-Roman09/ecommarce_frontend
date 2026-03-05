import { IVendor } from "./vendor.interfac";

export interface IBrand {
    id: string;
    name: string;
    slug: string | null;
    logo: string | null;
    description?: string | null;
    isActive: boolean;

    // Relations
    vendorId?: string | null;
    vendor?: IVendor | null;
    // products?: IProduct[];

    // Soft Delete fields
    isDeleted: boolean;
    deletedAt: Date | string | null;

    // Timestamps
    createdAt: Date | string;
    updatedAt: Date | string;
}