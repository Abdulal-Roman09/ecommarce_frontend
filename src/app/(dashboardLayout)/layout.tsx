import DashbardNavber from "@/components/modules/dashboardLayout/dashboardNavber/DashbardNavber";
import DashboardSidebar from "@/components/modules/dashboardLayout/dashboardSidbar/DashboardSidbar";
import { ReactNode } from "react";

interface CommonDashboardPageProps {
  children: ReactNode;
}

export default function CommonDashboardPage({
  children,
}: CommonDashboardPageProps) {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Top Navbar */}
      <header>
        <DashbardNavber />
      </header>

      <div className="flex flex-1">
        {/* Desktop Sidebar */}
        <aside className="hidden lg:block w-64 border-r">
          <DashboardSidebar />
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4 md:p-6 bg-muted/40">{children}</main>
      </div>
    </div>
  );
}
