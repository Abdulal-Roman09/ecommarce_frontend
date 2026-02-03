"use client";

import {
  deleteVendors,
  softDelteVendors,
} from "@/services/admin/vendorManagement";

import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { vendorColums } from "./VendorColums";
import { useState, useTransition } from "react";
import { IVendor } from "@/types/vendor.interfac";
import VendorViewDetailDialog from "./VendorViewDetailDialog";
import ManagementTable from "@/components/shared/Managements/MangementTable";
import DeleteConfirmationDialog from "@/components/shared/DeleteConfirmationDialog";

interface VendorTableProps {
  Vendor: IVendor[];
}

export default function VendorTable({ Vendor }: VendorTableProps) {
  const router = useRouter();
  const [, startTransition] = useTransition();
  const [viewingVendor, setViewingVendor] = useState<IVendor | null>(null);
  const [deletingVendor, setDeletingVendor] = useState<IVendor | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleRefresh = () => {
    startTransition(() => {
      router.refresh();
    });
  };

  const hendelView = (vendor: IVendor) => {
    setViewingVendor(vendor);
  };

  const handleDelete = (Vendor: IVendor) => {
    setDeletingVendor(Vendor);
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
      toast.error(result.message || "Failed to delete Vendor");
    }
  };

  return (
    <>
      <ManagementTable
        data={Vendor}
        columns={vendorColums}
        onEdit={() => {}}
        onView={hendelView}
        getRowKey={(Vendor) => Vendor.id}
        onDelete={handleDelete}
        emptyMessage="No Vendor found"
      />

      {/* views Vendor Detiles */}
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
