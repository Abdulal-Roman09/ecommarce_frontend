import { UserInfo } from "@/types/userInfo.interface";
import { NavSection } from "@/types/dashboard.interfac";
import { getNavItemsByRole } from "@/lib/nevItems.config";
import { getUserInfo } from "@/services/auth/getUserInfo";
import { getDefaultDashboardRoutes } from "@/lib/auth-utils";
import { DashboardSidebarContent } from "./Sidebarcontent/SidebarContent";



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
