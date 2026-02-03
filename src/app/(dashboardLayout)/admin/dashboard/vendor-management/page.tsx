/* eslint-disable @typescript-eslint/no-explicit-any */
import { Suspense } from "react";
import SelectFilter from "@/components/shared/SelectFilter";
import { getVendors } from "@/services/admin/vendorManagement";
import { getCategory } from "@/services/admin/categoryManagement";
import SearchFilter from "@/components/shared/Managements/SearchFilter";
import RefreshButton from "@/components/shared/Managements/RefreshButton";
import TableSkeleton from "@/components/shared/Managements/TableSkeleton";
import VendorTable from "@/components/modules/dashboardLayout/Admin/VendorManagements/VendorTable";
import VendorManagementsHeaders from "@/components/modules/dashboardLayout/Admin/VendorManagements/VendorManagementHeaders";

export default async function VendorManagementsPage() {
  const categoryResult = await getCategory();
  const vendorResult = await getVendors();
  console.log(vendorResult)

  return (
    <div className="space-y-6 ">
      <VendorManagementsHeaders category={categoryResult.data} />
      <div className="flex gap-2">
        <SearchFilter paramName="searchTerm" placeholder="Search Vendor...." />
        <SelectFilter
          paramName="category"
          options={categoryResult.data.map((category: any) => ({
            label: category.title,
            value: category.id,
          }))}
          placeholder="Filter by category"
        />
        <RefreshButton />
      </div>
      <Suspense fallback={<TableSkeleton row={10} columns={10} />}>
        <VendorTable Vendor={vendorResult.data || []} />
      </Suspense>
    </div>
  );
}
