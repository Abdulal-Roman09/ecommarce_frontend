export interface IVendor {
    id: string;
    name: string;
    email: string;
    password:string;
    contactNumber: string;
    address: string;
    gender: "MALE" | "FEMALE";
    profilePhoto?: string | null;
    isDelete: boolean;

    shops?: IShop[];
    categories: ICategories[];

    createdAt: Date;
    updatedAt: Date;
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