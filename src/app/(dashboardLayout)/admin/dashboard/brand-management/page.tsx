/* eslint-disable @typescript-eslint/no-explicit-any */
import { Suspense } from "react";
import SearchFilter from "@/components/shared/Managements/SearchFilter";
import RefreshButton from "@/components/shared/Managements/RefreshButton";
import TableSkeleton from "@/components/shared/Managements/TableSkeleton";
import TablePagination from "@/components/shared/Managements/TablePagination";
import SelectFilter from "@/components/shared/SelectFilter";
import BrandTable from "@/components/modules/dashboardLayout/Admin/BrandManagements/BrandTable";
import BrandManagementHeader from "@/components/modules/dashboardLayout/Admin/BrandManagements/BrandManagementHeader";
import { getBrands } from "@/services/admin/brandManagement";
import { queryStringFormatter } from "@/lib/queryStringFormatter";
import { getVendors } from "@/services/admin/vendorManagement";

export default async function BrandManagementPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const searchParamsObj = await searchParams;
  const queryString = queryStringFormatter(searchParamsObj);


  const brandResult = await getBrands(queryString);

  const vendorResult = await getVendors();
  const vendors = vendorResult?.data || [];

  const totalPages = Math.ceil(
    (brandResult?.meta?.total || 0) / (brandResult?.meta?.limit || 10),
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <BrandManagementHeader vendors={vendors} />

      {/* Filters */}
      <div className="flex gap-2">
        <SearchFilter paramName="searchTerm" placeholder="Search Brand..." />

        <SelectFilter
          paramName="vendor"
          options={vendors}
          placeholder="Filter by vendor"
        />

        <RefreshButton />
      </div>

      {/* Table + Pagination */}
      <Suspense fallback={<TableSkeleton row={10} columns={6} />}>
        <BrandTable brands={brandResult.data || []} vendors={vendors} />

        <TablePagination
          currentPage={brandResult?.meta?.page}
          totalPage={totalPages || 1}
        />
      </Suspense>
    </div>
  );
}
