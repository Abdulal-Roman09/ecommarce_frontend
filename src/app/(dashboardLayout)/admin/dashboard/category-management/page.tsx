import CategoryManagementsHeaders from "@/components/modules/dashboardLayout/Admin/CategoryManagements/CategoryManagementsHeaders";
import CategoryTable from "@/components/modules/dashboardLayout/Admin/CategoryManagements/CategoryTable";
import TableSkeleton from "@/components/shared/Managements/TableSkeleton";
import { getCategory } from "@/services/admin/categoryManagement";
import { Suspense } from "react";

export default async function CategoryManagementsPage() {
  const result = await getCategory();

  return (
    <div className="space-y-6">
      <CategoryManagementsHeaders />
      <Suspense fallback={<TableSkeleton row={10} columns={5} />}>
        <CategoryTable category={result.data} />
      </Suspense>
    </div>
  );
}
