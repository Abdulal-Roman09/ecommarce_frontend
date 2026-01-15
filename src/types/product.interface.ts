import { ICategory } from "./category.interface";

export interface IProduct {
    id: string;
    name: string;
    brand: string;
    description?: string | null;
    basePrice: number;
    image?: string | null;

    categoryId: string;
    category?: ICategory;

    createdAt: Date;
    updatedAt: Date;

    productCategories?: IProductCategory[]
}
