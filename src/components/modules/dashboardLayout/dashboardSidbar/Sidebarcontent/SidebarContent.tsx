"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserCheck } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

import { getIconComponent } from "@/lib/icon-mapper";
import { UserInfo } from "@/types/userInfo.interface";
import { NavSection } from "@/types/dashboard.interfac";

interface DashboardSidebarContentProps {
  userInfo: UserInfo;
  navItems: NavSection[];
  dashboardHome: string;
}

export function DashboardSidebarContent({
  userInfo,
  navItems,
}: DashboardSidebarContentProps) {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 hidden h-screen w-64 flex-col border-r bg-background md:flex">
      {/* Navigation */}
      <ScrollArea className="mt-16 flex-1">
        <nav className="flex flex-col gap-6 p-4">
          {navItems.map((section, sectionIndex) => (
            <div key={sectionIndex} className="flex flex-col gap-2">
              {section.title && (
                <h4 className="px-3 text-[10px] font-bold uppercase tracking-widest text-muted-foreground/70">
                  {section.title}
                </h4>
              )}

              <div className="flex flex-col gap-1">
                {section.items.map((item) => {
                  const isActive = pathname === item.href;
                  const Icon = getIconComponent(item.icon);

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`group flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors
                        ${
                          isActive
                            ? "bg-primary text-primary-foreground shadow-sm"
                            : "text-muted-foreground hover:bg-primary/10 hover:text-primary"
                        }`}
                    >
                      <Icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>
      </ScrollArea>

      {/* User Info Footer */}
      <div className="mt-auto border-t p-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="h-10 w-10 rounded-full"
            >
              <UserCheck className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            align="start"
            side="top"
            sideOffset={12}
            className="w-64 p-0"
          >
            {/* Basic Info */}
            <div className="p-4 space-y-1">
              <p className="text-sm font-semibold">{userInfo.name}</p>
              <p className="text-xs text-muted-foreground">{userInfo.email}</p>
            </div>

            <DropdownMenuSeparator />

            {/* Meta Info */}
            <div className="space-y-2 p-3 text-xs">
              <div className="flex items-center justify-between">
                <span className="uppercase text-muted-foreground">Role</span>
                <span className="font-medium uppercase">{userInfo.role}</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="uppercase text-muted-foreground">User ID</span>
                <span className="font-mono text-[11px]">{userInfo.id}</span>
              </div>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </aside>
  );
}
