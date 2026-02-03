"use client";

import { Badge } from "@/components/ui/badge";

interface StatusBadgeCellProps {
  isDeleted?: boolean;
  activeText?: string;
  deletedText?: string;
}

export default function StatusBadgeCell({
  isDeleted = false,
  activeText = "Active",
  deletedText = "Deleted",
}: StatusBadgeCellProps) {
  return (
    <Badge variant={isDeleted ? "destructive" : "default"}>
      {isDeleted ? deletedText : activeText}
    </Badge>
  );
}
