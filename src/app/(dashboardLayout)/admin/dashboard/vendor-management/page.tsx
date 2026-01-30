import { Suspense } from "react";
import TableSkeleton from "@/components/shared/Managements/TableSkeleton";
import VendorTable from "@/components/modules/dashboardLayout/Admin/VendorManagements/VendorTable";
import VendorManagementsHeaders from "@/components/modules/dashboardLayout/Admin/VendorManagements/VendorManagementHeaders";
import { getCategory } from "@/services/admin/categoryManagement";
import SearchFilter from "@/components/shared/Managements/SearchFilter";
import RefreshButton from "@/components/shared/Managements/RefreshButton";

export default async function VendorManagementsPage() {
  const categoryResult = await getCategory();

  return (
    <div className="space-y-6">
      <VendorManagementsHeaders category={categoryResult.data} />
      <div className="flex">
        <SearchFilter paramName="searchTerm" placeholder="Search Vendor...." />
        <SearchFilter
          paramName="category"
          options={categoryResult.data.map((category) => ({
            label: category.title,
            value: category.id,
          }))}
          placeholder="Filter by category"
        />
        <RefreshButton />
      </div>
      {/* <Suspense fallback={<TableSkeleton row={10} columns={5} />}>
        <VendorTable vendor={result.data} />
      </Suspense> */}
    </div>
  );
}
