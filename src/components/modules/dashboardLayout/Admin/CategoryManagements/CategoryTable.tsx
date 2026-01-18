"use client";

import DeleteConfirmationDialog from "@/components/shared/DeleteConfirmationDialog";
import ManagementTable from "@/components/shared/Managements/MangementTable";
import { ICategory } from "@/types/category.interface";
import { categoryColums } from "./CategoryColums";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { deleteCategory } from "@/services/admin/categoryManagement";
import { toast } from "sonner";

interface CategoryTableProps {
  category: ICategory[];
}

export default function CategoryTable({ category }: CategoryTableProps) {
  const router = useRouter();
  const [, startTransition] = useTransition();

  const [deletingCategory, setDeletingCategory] = useState<ICategory | null>(
    null,
  );
  const [isDeleting, setIsDeleting] = useState(false);

  const handleRefresh = () => {
    startTransition(() => {
      router.refresh();
    });
  };

  const handleDelete = (category: ICategory) => {
    setDeletingCategory(category);
  };

  const confirmDelete = async () => {
    if (!deletingCategory) return;

    setIsDeleting(true);
    const result = await deleteCategory(deletingCategory.id);
    setIsDeleting(false);
    setDeletingCategory(null);

    if (result.success) {
      toast.success(result.message || "Category deleted successfully");
      handleRefresh();
    } else {
      toast.error(result.message || "Failed to delete category");
    }
  };

  return (
    <>
      <ManagementTable
        data={category}
        columns={categoryColums}
        getRowKey={(category) => category.id}
        onDelete={handleDelete}
        emptyMessage="No category found"
      />

      <DeleteConfirmationDialog
        open={!!deletingCategory}
        onOpenChange={(open) => !open && setDeletingCategory(null)}
        onConfirm={confirmDelete}
        title="Delete Category"
        description={`Are you sure you want to delete "${deletingCategory?.title}"?`}
        isDeleting={isDeleting}
      />
    </>
  );
}
