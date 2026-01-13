import { Button } from "@/components/ui/button";
import { LucideIcon, Plus } from "lucide-react";
import { ReactNode } from "react";

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
  const Icons = action?.icons || Plus;
  return (
    <div>
      <div>
        <h1 className="">{title}</h1>
        {description && <p>{description}</p>}
      </div>
      {action && (
        <Button onClick={action.onCliked}>
          <Icons className="" />
          {action?.lable}
        </Button>
      )}
      {children}
    </div>
  );
}
