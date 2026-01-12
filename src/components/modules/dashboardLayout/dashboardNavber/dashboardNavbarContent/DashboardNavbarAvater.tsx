import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UserInfo } from "@/types/userInfo.interface";

interface DashboardNavberAvaterProps {
  userInfo: UserInfo;
}

export function DashboardNavbarAvater({
  userInfo,
}: DashboardNavberAvaterProps) {
  return (
    <div className="flex items-center gap-3">
      <Avatar className="h-9 w-9">
        <AvatarImage src="https://github.com/shadcn.png" alt="User Avatar" />
        <AvatarFallback>U</AvatarFallback>
      </Avatar>
    </div>
  );
}
