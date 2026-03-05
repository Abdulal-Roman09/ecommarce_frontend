/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import ManagementTable from "@/components/shared/Managements/MangementTable";
import DeleteConfirmationDialog from "@/components/shared/DeleteConfirmationDialog";
import { IBrand } from "@/types/brand.interface";
import { softDeleteBrand } from "@/services/admin/brandManagement";
import BrandFormDialog from "./BrandFormDialog";
import BrandViewDetailDialog from "./BrandViewDetailsDialog";
import { brandColumns } from "./BrandColumns";

interface BrandTableProps {
  brands: IBrand[];
  vendors: { id: string; name: string }[];
}

export default function BrandTable({ brands, vendors }: BrandTableProps) {
  const router = useRouter();
  const [, startTransition] = useTransition();

  const [viewingBrand, setViewingBrand] = useState<IBrand | null>(null);
  const [editingBrand, setEditingBrand] = useState<IBrand | null>(null);
  const [deletingBrand, setDeletingBrand] = useState<IBrand | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleRefresh = () => {
    startTransition(() => {
      router.refresh();
    });
  };

  const handleView = (brand: IBrand) => {
    setViewingBrand(brand);
  };

  const handleEdit = (brand: IBrand) => {
    setEditingBrand(brand);
  };

  const handleDelete = (brand: IBrand) => {
    setDeletingBrand(brand);
  };

  const confirmDelete = async () => {
    if (!deletingBrand) return;

    setIsDeleting(true);
    try {
      const result = await softDeleteBrand(deletingBrand.id);

      if (result.success) {
        toast.success(result.message || "Brand removed successfully");
        handleRefresh();
      } else {
        toast.error(result.message || "Failed to delete brand");
      }
    } catch (error) {
      toast.error("Something went wrong! Please try again.");
    } finally {
      setIsDeleting(false);
      setDeletingBrand(null);
    }
  };

  return (
    <>
      <ManagementTable
        data={brands}
        columns={brandColumns}
        onEdit={handleEdit}
        onView={handleView}
        onDelete={handleDelete}
        getRowKey={(brand) => brand.id}
        emptyMessage="No brands found. Start by adding a new one."
      />

      <BrandFormDialog
        open={!!editingBrand}
        onClose={() => setEditingBrand(null)}
        brand={editingBrand}
        vendors={vendors}
        onSuccess={() => {
          setEditingBrand(null);
          handleRefresh();
        }}
      />

      <DeleteConfirmationDialog
        open={!!deletingBrand}
        onOpenChange={(open) => !open && setDeletingBrand(null)}
        onConfirm={confirmDelete}
        title="Delete Brand"
        description={`Are you sure you want to delete "${deletingBrand?.name}"? This will move it to the trash but won't delete associated products.`}
        isDeleting={isDeleting}
      />

      <BrandViewDetailDialog
        open={!!viewingBrand}
        onClose={() => setViewingBrand(null)}
        brand={viewingBrand}
      />
    </>
  );
}
