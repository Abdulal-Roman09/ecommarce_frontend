"use client";

import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import VendorFromDialog from "./VendorFromDialog";
import { IVendor } from "@/types/vendor.interfac";
import { ICategory } from "@/types/category.interface";
import RefreshButton from "@/components/shared/Managements/RefreshButton";
import ManagementPageHeader from "@/components/shared/Managements/ManagementPageHeader";

interface VendorManagementsHeadersProps {
  vendor?: IVendor;
  category?: ICategory
}

export default function VendorManagementsHeaders({
  vendor,
  category,
}: VendorManagementsHeadersProps) {
  const router = useRouter();
  const [, startTransition] = useTransition();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleSuccess = () => {
    startTransition(() => {
      router.refresh();
    });
  };

  return (
    <div className="space-y-4">
      <VendorFromDialog
        open={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onSuccess={handleSuccess}
        vendor={vendor}
        category={category}
      />

      <ManagementPageHeader
        title="Vendor Management"
        description="Manage Vendor information and details"
        action={{
          lable: "Add Vendor",
          icons: Plus,
          onCliked: () => setIsDialogOpen(true),
        }}
      >
        <RefreshButton />
      </ManagementPageHeader>
    </div>
  );
}
