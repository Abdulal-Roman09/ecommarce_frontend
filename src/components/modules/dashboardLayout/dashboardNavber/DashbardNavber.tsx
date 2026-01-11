import { getUserInfo } from "@/services/auth/getUserInfo";
import DashboardNavberContent from "./dashboardNavbarContent/DashboardNavberContent";
import { UserInfo } from "@/types/userInfo.interface";

export default async function DashbardNavber() {
  const userInfo = (await getUserInfo()) as UserInfo;
  return <DashboardNavberContent userInfo={userInfo} />;
}
