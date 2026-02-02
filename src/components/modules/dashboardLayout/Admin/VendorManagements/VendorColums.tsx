import { IVendor } from "@/types/vendor.interfac";
import DateCell from "@/components/shared/cell/DateCell";
import UserInfoCell from "@/components/shared/cell/UserInfoCell";
import StatusBadgeCell from "@/components/shared/cell/StatusBadgeCell";
import { Column } from "@/components/shared/Managements/MangementTable";

export const vendorColums: Column<IVendor>[] = [
  {
    headers: "Vendor",
    accessor: (vendor) => (
      <UserInfoCell
        name={vendor?.name}
        email={vendor?.email}
        photo={vendor?.profilePhoto}
      />
    ),
  },
  {
    headers: "Shop",
    accessor: (vendor) => (
      <div className="flex flex-wrap gap-1">
        {vendor?.shops && vendor.shops.length > 0 ? (
          vendor?.shops?.map((shop) => (
            <span
              key={shop.id}
              className="px-2 py-1 bg-gray-100 rounded text-sm"
            >
              {shop.name}
            </span>
          ))
        ) : (
          <span className="text-xs text-gray-500">No specialties</span>
        )}
      </div>
    ),
  },
  {
    headers: "Category",
    accessor: (vendor) => (
      <div className="flex flex-wrap gap-1">
        {vendor?.categories && vendor.categories.length > 0 ? (
          vendor?.categories?.map((category) => (
            <span
              key={category.id}
              className="px-2 py-1 bg-gray-100 rounded text-sm"
            >
              {category.icons}
            </span>
          ))
        ) : (
          <span className="text-xs text-gray-500">No specialties</span>
        )}
      </div>
    ),
  },
  {
    headers: "Contact",
    accessor: (vendor) => <div>{vendor.contactNumber}</div>,
  },
  {
    headers: "Gender",
    accessor: (vendor) => (
      <span className="text-sm capitalize">{vendor.gender.toLowerCase()}</span>
    ),
  },
  {
    headers: "Status",
    accessor: (vendor) => <StatusBadgeCell isDeleted={vendor.isDelete} />,
  },
  {
    headers: "Joined",
    accessor: (vendor) => <DateCell date={vendor.createdAt} />,
  },
];
