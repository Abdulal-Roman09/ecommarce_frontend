"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserCheck } from "lucide-react";

import Logo from "@/components/shared/Logo";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { getIconComponent } from "@/lib/icon-mapper";
import { NavSection } from "@/types/dashboard.interfac";
import { UserInfo } from "@/types/userInfo.interface";

interface SidebarMobileContentProps {
  userInfo: UserInfo;
  navItems?: NavSection[];
  dashboardHome: string;
}

export function SidebarMobileContent({
  userInfo,
  navItems = [],
}: SidebarMobileContentProps) {
  const pathname = usePathname();

  return (
    <div className="flex h-full flex-col">
      {/* Logo */}
      <div className="px-4 py-4">
        <Logo brandName="Ecommerce" />
      </div>

      <Separator />

      {/* Navigation */}
      <ScrollArea className="flex-1 px-3 py-4">
        <nav className="flex flex-col gap-6">
          {navItems.map((section, sectionIndex) => (
            <div key={sectionIndex} className="space-y-2">
              {section.title && (
                <h4 className="px-3 text-[11px] font-bold uppercase tracking-wider text-muted-foreground/70">
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
                      className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors
                        ${
                          isActive
                            ? "bg-primary/10 text-primary"
                            : "text-muted-foreground hover:bg-muted"
                        }`}
                    >
                      <Icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </Link>
                  );
                })}
              </div>

              {sectionIndex < navItems.length - 1 && (
                <Separator className="my-4" />
              )}
            </div>
          ))}
        </nav>
      </ScrollArea>

      {/* User Info Dropdown */}
      <div className="border-t p-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              <UserCheck className="h-5 " />
              <span className="text-sm font-medium truncate">
                {userInfo.name}
              </span>
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent className="w-64" side="top" align="start">
            <div className="space-y-1 p-3">
              <p className="text-sm font-semibold">{userInfo.name}</p>
              <p className="text-xs text-muted-foreground">{userInfo.email}</p>
            </div>

            <DropdownMenuSeparator />

            <div className="space-y-2 p-3 text-xs">
              <div className="flex justify-between">
                <span className="uppercase text-muted-foreground">Role</span>
                <span className="font-medium uppercase">{userInfo.role}</span>
              </div>

              <div className="flex justify-between">
                <span className="uppercase text-muted-foreground">User ID</span>
                <span className="font-mono text-[11px]">{userInfo.id}</span>
              </div>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
