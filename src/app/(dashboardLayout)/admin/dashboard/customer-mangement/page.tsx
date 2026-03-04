/* eslint-disable @typescript-eslint/no-explicit-any */

import { Suspense } from "react";
import { getcustomers } from "@/services/admin/customerManagemts";
import { queryStringFormatter } from "@/lib/queryStringFormatter";
import SearchFilter from "@/components/shared/Managements/SearchFilter";
import RefreshButton from "@/components/shared/Managements/RefreshButton";
import TableSkeleton from "@/components/shared/Managements/TableSkeleton";
import TablePagination from "@/components/shared/Managements/TablePagination";
import CustomerManagementsHeaders from "@/components/modules/dashboardLayout/Admin/CustomerManagemts/CustomerManagementHeaders";
import CustomerTable from "@/components/modules/dashboardLayout/Admin/CustomerManagemts/CustomerTable";

export default async function CustomerManagementsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  // Parsing search parameters
  const searchParamsObj = await searchParams;
  const queryString = queryStringFormatter(searchParamsObj);

  // Fetching customer data from the server
  const customerResult = await getcustomers(queryString);

  // Calculating total pages for pagination
  const totalPages = Math.ceil(
    (customerResult?.meta?.total || 0) / (customerResult?.meta?.limit || 10),
  );

  return (
    <div className="space-y-6">
      {/* Page Header with "Add Customer" functionality */}
      <CustomerManagementsHeaders />

      {/* Filters and Search Section */}
      <div className="flex items-center gap-3">
        <div className="flex-1 max-w-sm">
          <SearchFilter
            paramName="searchTerm"
            placeholder="Search customers by name, email or phone..."
          />
        </div>
        <RefreshButton />
      </div>

      {/* Data Table with Loading State */}
      <Suspense fallback={<TableSkeleton row={10} columns={6} />}>
        <div className="rounded-md border bg-card shadow-sm">
          <CustomerTable customers={customerResult.data || []} />
        </div>

        {/* Pagination Control */}
        <div className="py-4">
          <TablePagination
            currentPage={customerResult?.meta?.page || 1}
            totalPage={totalPages || 1}
          />
        </div>
      </Suspense>
    </div>
  );
}
