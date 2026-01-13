"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import Link from "next/link";
import { User, Settings, Lock } from "lucide-react";
import { UserInfo } from "@/types/userInfo.interface";
import LogOutButton from "@/components/shared/LogOutButton";
import { DashboardNavbarAvater } from "./DashboardNavbarAvater";

interface DashboardNavberAvaterDropDownProps {
  userInfo: UserInfo;
}

export function DashboardNavberAvaterDropDown({
  userInfo,
}: DashboardNavberAvaterDropDownProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          aria-label="User menu"
          className="rounded-full outline-none ring-offset-background transition focus-visible:ring-2 focus-visible:ring-ring"
        >
          <DashboardNavbarAvater userInfo={userInfo} />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-60 rounded-xl p-1">
        {/* Header */}
        <DropdownMenuLabel className="flex flex-col gap-1 px-2 py-2">
          <span className="text-center font-medium">
            {userInfo?.role ?? ""}
          </span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        {/* Profile */}
        <DropdownMenuItem asChild>
          <Link href="/profile" className="flex items-center gap-2">
            <User className="h-4 w-4" />
            <span>Profile</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        {/* Settings */}

        <DropdownMenuItem asChild>
          <Link href="/settings" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            <span>Settings</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />

        {/* Change Password */}
        <DropdownMenuItem asChild>
          <Link href="/change-password" className="flex items-center gap-2">
            <Lock className="h-4 w-4" />
            <span>Change Password</span>
          </Link>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        {/* Logout */}
        <DropdownMenuItem className="p-0">
          <LogOutButton />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
