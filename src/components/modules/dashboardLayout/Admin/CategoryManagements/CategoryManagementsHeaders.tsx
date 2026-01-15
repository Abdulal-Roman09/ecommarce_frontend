"use client";

import { Plus } from "lucide-react";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import CategoryFromDialog from "./CategoryFromDialog";
import ManagementPageHeader from "@/components/shared/Managements/ManagementPageHeader";
import RefreshButton from "@/components/shared/Managements/RefreshButton";

export default function CategoryManagementsHeaders() {
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
      <CategoryFromDialog
        open={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onSuccess={handleSuccess}
      />

      <ManagementPageHeader 
        title="Category Management"
        description="Manage category information and details"
        action={{
          lable: "Add Category",
          icons: Plus,
          onCliked: () => setIsDialogOpen(true),
        }}
      >
        <RefreshButton />
      </ManagementPageHeader>
    </div>
  );
}
