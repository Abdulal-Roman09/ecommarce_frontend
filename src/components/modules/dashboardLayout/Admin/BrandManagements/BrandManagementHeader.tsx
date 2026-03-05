/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Tag } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { IBrand } from "@/types/brand.interface";
import BrandFormDialog from "./BrandFormDialog";
import ManagementPageHeader from "@/components/shared/Managements/ManagementPageHeader";

interface BrandManagementHeaderProps {
  brand?: IBrand;
  vendors: { id: string; name: string }[];
}

export default function BrandManagementHeader({
  brand,
  vendors,
}: BrandManagementHeaderProps) {
  const router = useRouter();
  const [, startTransition] = useTransition();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleSuccess = () => {
    startTransition(() => {
      router.refresh();
    });
    setIsDialogOpen(false);
  };

  return (
    <div className="space-y-4">

      <BrandFormDialog
        open={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onSuccess={handleSuccess}
        brand={brand}
        vendors={vendors}
      />

      <ManagementPageHeader
        title="Brand Management"
        description="Organize and manage your product brands and vendor associations"
        action={{
          lable: "Add Brand",
          icons: Tag,
          onCliked: () => setIsDialogOpen(true),
        }}
      >
      </ManagementPageHeader>
    </div>
  );
}
