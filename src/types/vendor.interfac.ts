export interface IVendor {
    id: string;

    email: string;
    user?: IUser;

    name: string;
    profilePhoto?: string | null;
    contactNumber: string;
    gender: Gender;
    address: string;

    rating: number;

    isVerified: boolean;
    isDelete: boolean;

    createdAt: Date;
    updatedAt: Date;
}
