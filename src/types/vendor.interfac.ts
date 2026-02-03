

export interface IVendor {
    id: string;
    name: string;
    email: string;
    password: string;
    profilePhoto?: string | null;
    contactNumber: string;
    gender: "MALE" | "FEMALE";
    address: string;
    rating: number;
    isVerified: boolean;
    isDelete: boolean;
    shops: IShop[];
    categories: ICategories[];
    createdAt: string;
    updatedAt: string;
}


export interface IShop {
    id: string;
    name: string;
    description?: string | null;
    logo?: string | null;
    banner?: string | null;
    email: string;
    phone?: string | null;
    address?: string | null;
    isActive: boolean;
    isVerified: boolean;

    vendorId?: string | null;

    createdAt: Date;
    updatedAt: Date;
}

export interface ICategories {
    id: string
    title: string
    icons: string
}