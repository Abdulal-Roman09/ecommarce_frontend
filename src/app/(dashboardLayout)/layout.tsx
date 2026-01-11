import DashbardNavber from "@/components/modules/dashboardLayout/dashboardNavber/DashbardNavber";
import DashboardSidbar from "@/components/modules/dashboardLayout/dashboardSidbar/DashboardSidbar";
import { ReactNode } from "react";

export default function CommonDashboardPage({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div>
      <DashbardNavber />
      <DashboardSidbar />
      {children}
    </div>
  );
}
