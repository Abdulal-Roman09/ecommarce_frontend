import Image from "next/image";
import { Store } from "lucide-react";
import { IBrand } from "@/types/brand.interface";
import DateCell from "@/components/shared/cell/DateCell";
import StatusBadgeCell from "@/components/shared/cell/StatusBadgeCell";
import { Column } from "@/components/shared/Managements/MangementTable";

export const brandColumns: Column<IBrand>[] = [
  {
    headers: "Brand Info",
    accessor: (brand) => (
      <div className="flex items-center gap-3">
        {/* Brand Logo Container */}
        <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full border bg-muted">
          <Image
            src={brand?.logo || "/placeholder-logo.png"}
            alt={brand?.name || "Brand"}
            fill
            className="object-cover"
          />
        </div>
        {/* Brand Name and Slug */}
        <div className="flex flex-col">
          <span className="text-sm font-medium leading-none text-foreground">
            {brand?.name}
          </span>
          <span className="text-xs text-muted-foreground mt-1">
            {brand?.slug || "no-slug"}
          </span>
        </div>
      </div>
    ),
  },
  {
    headers: "Vendor",
    accessor: (brand) => (
      <div className="flex items-center gap-1.5 text-sm font-medium">
        <Store className="h-3.5 w-3.5 text-muted-foreground" />
        {brand?.vendor?.name || "No Vendor"}
      </div>
    ),
  },
  {
    headers: "Status",
    accessor: (brand) => <StatusBadgeCell isDeleted={brand?.isDeleted} />,
  },
  {
    headers: "Created Date",
    accessor: (brand) => <DateCell date={brand?.createdAt} />,
  },
];
