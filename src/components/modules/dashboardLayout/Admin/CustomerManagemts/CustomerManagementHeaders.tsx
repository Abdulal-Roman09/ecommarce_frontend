/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { UserPlus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import CustomerFormDialog from "./CustomerFromDialog";
import { ICustomer } from "@/types/customer.interface";
import ManagementPageHeader from "@/components/shared/Managements/ManagementPageHeader";

interface CustomerManagementsHeadersProps {
  customer?: ICustomer;
}

export default function CustomerManagementsHeaders({
  customer,
}: CustomerManagementsHeadersProps) {
  const router = useRouter();
  const [, startTransition] = useTransition();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Function to refresh the page data after a successful creation
  const handleSuccess = () => {
    startTransition(() => {
      router.refresh();
    });
    setIsDialogOpen(false);
  };

  return (
    <div className="space-y-4">
      {/* Dialog for creating a new customer */}
      <CustomerFormDialog
        open={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onSuccess={handleSuccess}
        customer={customer}
      />

      {/* Shared Header Component for consistent UI */}
      <ManagementPageHeader
        title="Customer Management"
        description="View, add, and manage your system's customer directory"
        action={{
          lable: "Add Customer", // Label naming matches your existing prop naming convention
          icons: UserPlus,
          onCliked: () => setIsDialogOpen(true), // Fixed naming as per your provided code
        }}
      />
    </div>
  );
}
