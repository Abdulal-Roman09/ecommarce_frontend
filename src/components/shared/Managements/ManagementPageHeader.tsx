"use client";

import { Button } from "@/components/ui/button";
import { LucideIcon, Plus } from "lucide-react";

interface ManagementPageHeaderProps {
  title: string;
  description?: string;
  action?: {
    lable: string;
    icons?: LucideIcon;
    onCliked: () => void;
  };
  children?: React.ReactNode;
}

export default function ManagementPageHeader({
  title,
  description,
  action,
  children,
}: ManagementPageHeaderProps) {
  const Icon = action?.icons || Plus;

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      {/* Left: Title & Description */}
      <div className="space-y-0.5">
        <h1 className="text-lg font-semibold tracking-tight sm:text-2xl">
          {title}
        </h1>

        {description && (
          <p className="text-xs text-muted-foreground sm:text-sm">
            {description}
          </p>
        )}
      </div>

      {/* Right: Action Button */}
      {action && (
        <Button
          onClick={action.onCliked}
          size="sm"
          className="flex w-full items-center justify-center gap-2 sm:w-auto"
        >
          <Icon className="h-4 w-4" />
          <span className="text-sm">{action.lable}</span>
        </Button>
      )}

      {children}
    </div>
  );
}
