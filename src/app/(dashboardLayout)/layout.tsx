import { ReactNode } from "react";
import DashbardNavber from "@/components/modules/dashboardLayout/dashboardNavber/DashbardNavber";
import DashboardSidbar from "@/components/modules/dashboardLayout/dashboardSidbar/DashboardSidbar";

interface CommonDashboardPageProps {
  children: ReactNode;
}

export default function CommonDashboardPage({
  children,
}: CommonDashboardPageProps) {
  return (
    <div>
      <DashbardNavber />
      <DashboardSidbar> {children}</DashboardSidbar>
    </div>
  );
}
