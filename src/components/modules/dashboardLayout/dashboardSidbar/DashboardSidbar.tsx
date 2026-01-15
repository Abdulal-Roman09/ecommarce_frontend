import { DashboardSidebarContent } from "./Sidebarcontent/SidebarContent";
import { getUserInfo } from "@/services/auth/getUserInfo";
import { UserInfo } from "@/types/userInfo.interface";
import { getDefaultDashboardRoutes } from "@/lib/auth-utils";
import { NavSection } from "@/types/dashboard.interfac";
import { getNavItemsByRole } from "@/lib/nevItems.config";



export default async function DashboardSidebar({
}) {
  const userInfo = (await getUserInfo()) as UserInfo;
  const navItems: NavSection[] = getNavItemsByRole(userInfo.role);
  const dashboardHome = getDefaultDashboardRoutes(userInfo.role);

  return (
    <DashboardSidebarContent
      userInfo={userInfo}
      navItems={navItems}
      dashboardHome={dashboardHome}
    />
  );
}
