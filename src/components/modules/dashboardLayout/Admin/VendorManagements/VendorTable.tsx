"use client";

import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { vendorColums } from "./VendorColums";
import { useState, useTransition } from "react";
import VendorFromDialog from "./VendorFromDialog";
import { ICategories, IVendor } from "@/types/vendor.interfac";
import VendorViewDetailDialog from "./VendorViewDetailDialog";
import { softDelteVendors } from "@/services/admin/vendorManagement";
import ManagementTable from "@/components/shared/Managements/MangementTable";
import DeleteConfirmationDialog from "@/components/shared/DeleteConfirmationDialog";

interface VendorTableProps {
  vendors: IVendor[];
  categories: ICategories[];
}

export default function VendorTable({ vendors, categories }: VendorTableProps) {
  const router = useRouter();
  const [, startTransition] = useTransition();

  const [viewingVendor, setViewingVendor] = useState<IVendor | null>(null);
  const [editingVendor, setEditingVendor] = useState<IVendor | null>(null);
  const [deletingVendor, setDeletingVendor] = useState<IVendor | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleRefresh = () => {
    startTransition(() => {
      router.refresh();
    });
  };

  const handleView = (vendor: IVendor) => {
    setViewingVendor(vendor);
  };

  const handleEdit = (vendor: IVendor) => {
    setEditingVendor(vendor);
  };

  const handleDelete = (vendor: IVendor) => {
    setDeletingVendor(vendor);
  };

  const confirmDelete = async () => {
    if (!deletingVendor) return;

    setIsDeleting(true);
    const result = await softDelteVendors(deletingVendor.id);
    setIsDeleting(false);
    setDeletingVendor(null);

    if (result.success) {
      toast.success(result.message || "Vendor deleted successfully");
      handleRefresh();
    } else {
      toast.error(result.message || "Failed to delete vendor");
    }
  };

  return (
    <>
      <ManagementTable
        data={vendors}
        columns={vendorColums}
        onEdit={handleEdit}
        onView={handleView}
        onDelete={handleDelete}
        getRowKey={(vendor) => vendor.id}
        emptyMessage="No vendor found"
      />

      {/* Edit Vendor Form */}

      <VendorFromDialog
        open={!!editingVendor}
        onClose={() => setEditingVendor(null)}
        category={categories}
        vendor={editingVendor}
        onSuccess={() => {
          setEditingVendor(null);
          handleRefresh();
        }}
      />

      {/* View Vendor Details */}

      <VendorViewDetailDialog
        open={!!viewingVendor}
        onClose={() => setViewingVendor(null)}
        vendor={viewingVendor}
      />
      

      <DeleteConfirmationDialog
        open={!!deletingVendor}
        onOpenChange={(open) => !open && setDeletingVendor(null)}
        onConfirm={confirmDelete}
        title="Delete Vendor"
        description={`Are you sure you want to delete "${deletingVendor?.name}"?`}
        isDeleting={isDeleting}
      />
    </>
  );
}
