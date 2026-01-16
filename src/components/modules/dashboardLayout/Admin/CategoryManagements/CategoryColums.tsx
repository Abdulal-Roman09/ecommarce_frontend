import { Column } from "@/components/shared/Managements/MangementTable";
import { ICategory } from "@/types/category.interface";
import Image from "next/image";

export const categoryColums: Column<ICategory>[] = [
  {
    headers: "Icon",
    accessor: (category) =>
      category.icons ? (
        <Image
          src={category.icons}
          alt={category.title}
          width={40}
          height={40}
          className="rounded-full object-cover"
        />
      ) : (
        <div className="h-10 w-10 rounded-full bg-muted" />
      ),
  },
  {
    headers: "Title",
    accessor: (category) => category.title,
  },
];
