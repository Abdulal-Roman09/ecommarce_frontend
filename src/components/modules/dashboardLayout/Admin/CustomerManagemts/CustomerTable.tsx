/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { customerColumns } from "./CustomerColums";
import CustomerFormDialog from "./CustomerFromDialog";
import { ICustomer } from "@/types/customer.interface";
import CustomerViewDetailDialog from "./CustomerViewDetailDialog";
import { softDeleteCustomers } from "@/services/admin/customerManagemts";
import ManagementTable from "@/components/shared/Managements/MangementTable";
import DeleteConfirmationDialog from "@/components/shared/DeleteConfirmationDialog";

interface CustomerTableProps {
  customers: ICustomer[];
}

export default function CustomerTable({ customers }: CustomerTableProps) {
  const router = useRouter();
  const [, startTransition] = useTransition();

  // State management for different actions
  const [viewingCustomer, setViewingCustomer] = useState<ICustomer | null>(
    null,
  );
  const [editingCustomer, setEditingCustomer] = useState<ICustomer | null>(
    null,
  );
  const [deletingCustomer, setDeletingCustomer] = useState<ICustomer | null>(
    null,
  );
  const [isDeleting, setIsDeleting] = useState(false);

  // Refresh data after mutations (Create, Update, Delete)
  const handleRefresh = () => {
    startTransition(() => {
      router.refresh();
    });
  };

  const handleView = (customer: ICustomer) => {
    setViewingCustomer(customer);
  };

  const handleEdit = (customer: ICustomer) => {
    setEditingCustomer(customer);
  };

  const handleDelete = (customer: ICustomer) => {
    setDeletingCustomer(customer);
  };


  const confirmDelete = async () => {
    if (!deletingCustomer) return;

    setIsDeleting(true);
    try {
      const result = await softDeleteCustomers(deletingCustomer.id);

      if (result.success) {
        toast.success(
          result.message || "Customer account deleted successfully",
        );
        handleRefresh();
      } else {
        toast.error(result.message || "Failed to delete customer");
      }
    } catch (error) {
      toast.error("Something went wrong! Please try again.");
    } finally {
      setIsDeleting(false);
      setDeletingCustomer(null);
    }
  };

  return (
    <>
      <ManagementTable
        data={customers}
        columns={customerColumns}
        onEdit={handleEdit}
        onView={handleView}
        onDelete={handleDelete}
        getRowKey={(customer) => customer.id}
        emptyMessage="No customers found in the system."
      />

      <CustomerFormDialog
        open={!!editingCustomer}
        onClose={() => setEditingCustomer(null)}
        customer={editingCustomer}
        onSuccess={() => {
          setEditingCustomer(null);
          handleRefresh();
        }}
      />

      <CustomerViewDetailDialog
        open={!!viewingCustomer}
        onClose={() => setViewingCustomer(null)}
        customer={viewingCustomer}
      />

      <DeleteConfirmationDialog
        open={!!deletingCustomer}
        onOpenChange={(open) => !open && setDeletingCustomer(null)}
        onConfirm={confirmDelete}
        title="Delete Customer Account"
        description={`Are you sure you want to delete "${deletingCustomer?.name}"? This action moves the user to the trash.`}
        isDeleting={isDeleting}
      />
    </>
  );
}
