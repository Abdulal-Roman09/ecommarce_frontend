"use client";

import { cn } from "@/lib/utils";
import { RotateCw } from "lucide-react";
import { VariantProps } from "class-variance-authority";
import { Button, buttonVariants } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useTransition } from "react";

interface RefreshButtonProps {
  variant?: VariantProps<typeof buttonVariants>["variant"];
  size?: VariantProps<typeof buttonVariants>["size"];
  label?: string;
  className?: string;
}

const RefreshButton = ({
  variant = "outline",
  size = "sm",
  label = "Refresh",
  className,
}: RefreshButtonProps) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleRefresh = () => {
    startTransition(() => {
      router.refresh();
    });
  };

  return (
    <Button
      variant={variant}
      size={size}
      className={cn("gap-2", className)}
      onClick={handleRefresh}
      disabled={isPending}
    >
      <RotateCw className={cn("h-4 w-4", isPending && "animate-spin")} />
      {isPending ? "Refreshing..." : label}
    </Button>
  );
};

export default RefreshButton;
