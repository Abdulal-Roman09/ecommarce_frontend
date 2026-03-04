import { ICustomer } from "@/types/customer.interface";
import DateCell from "@/components/shared/cell/DateCell";
import UserInfoCell from "@/components/shared/cell/UserInfoCell";
import StatusBadgeCell from "@/components/shared/cell/StatusBadgeCell";
import { Column } from "@/components/shared/Managements/MangementTable";
import { MapPin, Phone } from "lucide-react";

export const customerColumns: Column<ICustomer>[] = [
  {
    headers: "Customer Info",
    accessor: (customer) => (
      <UserInfoCell
        name={customer?.name}
        email={customer?.email}
        photo={customer?.profilePhoto}
      />
    ),
  },
  {
    headers: "Contact",
    accessor: (customer) => (
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-1.5 text-sm">
          <Phone className="h-3.5 w-3.5 text-muted-foreground" />
          {customer?.contactNumber}
        </div>
      </div>
    ),
  },
  {
    headers: "Gender",
    accessor: (customer) => (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-muted capitalize">
        {customer?.gender?.toLowerCase()}
      </span>
    ),
  },
  {
    headers: "Address",
    accessor: (customer) => (
      <div className="flex items-start gap-1.5 max-w-50">
        <MapPin className="h-3.5 w-3.5 text-muted-foreground mt-0.5 shrink-0" />
        <span
          className="text-sm truncate"
          title={customer?.presentAddress || "N/A"}
        >
          {customer?.presentAddress || "Not provided"}
        </span>
      </div>
    ),
  },
  {
    headers: "Status",
    accessor: (customer) => <StatusBadgeCell isDeleted={customer?.isDeleted} />,
  },
  {
    headers: "Joined Date",
    accessor: (customer) => <DateCell date={customer.createdAt} />,
  },
];
