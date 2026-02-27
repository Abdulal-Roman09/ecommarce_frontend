import { UserInfo } from "@/types/userInfo.interface";
import { getNavItemsByRole } from "@/lib/nevItems.config";
import { getUserInfo } from "@/services/auth/getUserInfo";
import { getDefaultDashboardRoutes } from "@/lib/auth-utils";
import DashboardNavberContent from "./dashboardNavbarContent/DashboardNavberContent";

export default async function DashbardNavber() {
  const userInfo = (await getUserInfo()) as UserInfo;
  const navItems = getNavItemsByRole(userInfo?.role);
  const dashboardHome = getDefaultDashboardRoutes(userInfo?.role);
  return (
    <DashboardNavberContent
      userInfo={userInfo}
      navItems={navItems}
      dashboardHome={dashboardHome}
    />
  );
}
