export interface IVendor {
    id?: string;
    email: string;
    name: string;
    password: string,
    profilePhoto?: string | null;
    contactNumber: string;
    gender: "MALE" | "FEMELE";
    address: string;
    rating?: number;
    isVerified?: boolean;
    isDelete?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}
