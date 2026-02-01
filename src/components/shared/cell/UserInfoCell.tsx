"use client"
import { getInitials } from "@/lib/formatter";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface UserInfoCellProps {
  name: string;
  email: string;
  photo?: string | null;
}

export default function UserInfoCell({
  name,
  email,
  photo,
}: UserInfoCellProps) {
  return (
    <div className="flex items-center gap-3">
      {/* Profile Image Section */}
      <Avatar>
        {photo && (
          <AvatarImage src={photo} alt={name} className="object-cover" />
        )}
        <AvatarFallback>{getInitials(name)}</AvatarFallback>
      </Avatar>

      {/* Text Information Section */}
      <div className="flex flex-col">
        <p className="text-sm font-medium leading-none">{name}</p>
        <p className="text-sm text-muted-foreground">{email}</p>
      </div>
    </div>
  );
}
