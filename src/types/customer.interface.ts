export interface ICustomer {
    id: string;
    email: string;
    name: string;
    contactNumber: string;
    profilePhoto?: string | null;
    presentAddress?: string | null;
    gender: "MALE" | "FEMALE";
    isDeleted: boolean;
    deletedAt?: Date | null;

    createdAt: Date;
    updatedAt: Date;

    //   orders?: IOrder[];
    //   payments?: IPayment[];
    //   wishlists?: IWishlist[];
    //   reviews?: IReview[];
    //   addresses?: IAddress[];
}