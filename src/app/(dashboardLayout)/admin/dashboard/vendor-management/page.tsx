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
import { queryStringFormatter } from "@/lib/queryStringFormatter";
import { ICategories } from "@/types/vendor.interfac";
import TablePagination from "@/components/shared/Managements/TablePagination";

export default async function VendorManagementsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const searchParamsObj = await searchParams;
  const queryString = queryStringFormatter(searchParamsObj);
  const categoryResult = await getCategory();
  const vendorResult = await getVendors(queryString);
  const totalPages = Math.ceil(
    vendorResult?.meta?.total / vendorResult?.meta?.limit,
  );

  return (
    <div className="space-y-6 ">
      <VendorManagementsHeaders category={categoryResult.data} />
      <div className="flex gap-2">
        <SearchFilter paramName="searchTerm" placeholder="Search Vendor...." />
        <SelectFilter
          paramName="category"
          options={categoryResult.data.map((category: ICategories) => ({
            label: category.title,
            value: category.id,
          }))}
          placeholder="Filter by category"
        />
        <RefreshButton />
      </div>
      <Suspense fallback={<TableSkeleton row={10} columns={10} />}>
        <VendorTable Vendor={vendorResult.data || []} />
        <TablePagination
          currentPage={vendorResult?.meta?.page}
          totalPage={totalPages}
        />
      </Suspense>
    </div>
  );
}
