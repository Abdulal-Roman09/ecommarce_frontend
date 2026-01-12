import { getUserInfo } from "@/services/auth/getUserInfo";
import DashboardNavberContent from "./dashboardNavbarContent/DashboardNavberContent";
import { UserInfo } from "@/types/userInfo.interface";
import { getNavItemsByRole } from "@/lib/nevItems.config";
import { getDefaultDashboardRoutes } from "@/lib/auth-utils";

export default async function DashbardNavber() {
  const userInfo = (await getUserInfo()) as UserInfo;
  const navItems = getNavItemsByRole(userInfo.role);
  const dashboardHome = getDefaultDashboardRoutes(userInfo.role);
  return (
    <DashboardNavberContent
      userInfo={userInfo}
      navItems={navItems}
      dashboardHome={dashboardHome}
    />
  );
}
