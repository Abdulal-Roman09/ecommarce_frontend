import { getUserInfo } from "@/services/auth/getUserInfo";
import MyProfile from "@/components/modules/commonLayout/MyProfile/MyProfile";

const MyProfilePage = async () => {
  const userInfo = await getUserInfo();
  return <MyProfile userInfo={userInfo} />;
};

export default MyProfilePage;
