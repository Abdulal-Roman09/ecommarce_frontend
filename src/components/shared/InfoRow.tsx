import { ReactNode } from "react";

interface InfoRowProps {
  label: string;
  value?: string | number;
  icon?: ReactNode;
  className?: string;
}

export function InfoRow({
  label,
  value,
  icon,
  className,
}: InfoRowProps) {
  return (
    <div className={`flex items-start gap-3 ${className ?? ""}`}>
      {icon && (
        <span className="mt-1 text-muted-foreground">
          {icon}
        </span>
      )}

      <div className="space-y-1">
        <p className="text-sm text-muted-foreground">
          {label}
        </p>
        <p className="text-sm font-medium">
          {value ?? "N/A"}
        </p>
      </div>
    </div>
  );
}
