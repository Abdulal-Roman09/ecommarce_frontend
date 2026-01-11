"use client";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { UserInfo } from "@/types/userInfo.interface";
import { DashboardNavberAvaterDropDown } from "./DashboarNavbarAvaterDropDown";

interface DashboardNavberContentProps {
  userInfo: UserInfo;
}

export default function DashboardNavberContent({
  userInfo,
}: DashboardNavberContentProps) {
  return (
    <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b bg-background px-6">
      <div className="flex items-center gap-2"> </div>

      {/* Middle: Search */}
      <div className="hidden w-full max-w-md md:flex items-center gap-3">
        <div className="relative w-full">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search products, orders..."
            className="h-10 pl-9 border-primary/60 focus-visible:ring-1 focus-visible:ring-primary"
          />
        </div>
        <Button
          variant="outline"
          className="h-10 px-5 border-primary/60 hover:bg-primary/5"
        >
          Search
        </Button>
      </div>

      {/* Right: Avatar */}
      <DashboardNavberAvaterDropDown userInfo={userInfo} />
    </header>
  );
}
