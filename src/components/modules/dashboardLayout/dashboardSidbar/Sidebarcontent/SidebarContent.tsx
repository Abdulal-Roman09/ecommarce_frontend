"use client";

import { UserInfo } from "@/types/userInfo.interface";
import { NavSection } from "@/types/dashboard.interfac";
import Logo from "@/components/shared/Logo";
import { ScrollArea } from "@/components/ui/scroll-area";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Separator } from "@/components/ui/separator";
import { getIconComponent } from "@/lib/icon-mapper";

interface DashboardSidebarContentProps {
  userInfo: UserInfo;
  navItems: NavSection[];
  dashboardHome: string;
}

export function DashboardSidebarContent({
  userInfo,
  navItems,
  dashboardHome,
}: DashboardSidebarContentProps) {
  const pathname = usePathname();

  return (
    <div className="fixed top-0 left-0 hidden h-screen w-64 flex-col border-r bg-background md:flex">
      {/* Logo Section */}
      <div className="flex h-16 items-center border-b px-6">
        <Logo brandName="Ecommerce" />
      </div>

      {/* Navigation Section */}
      <ScrollArea className="flex-1">
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
                      className={`group flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200
                        ${
                          isActive
                            ? "bg-primary text-primary-foreground shadow-sm"
                            : "text-muted-foreground hover:bg-secondary hover:text-secondary-foreground" // Hover state (Secondary color)
                        }`}
                    >
                      <Icon
                        className={`h-4 w-4 transition-colors ${
                          isActive
                            ? "text-primary-foreground"
                            : "group-hover:text-secondary-foreground"
                        }`}
                      />
                      <span>{item.title}</span>
                    </Link>
                  );
                })}
                {sectionIndex < navItems.length - 1 && (
                  <Separator className="my-4" />
                )}
              </div>
            </div>
          ))}
        </nav>
      </ScrollArea>

      {/* Footer / User Info (Optional) */}
      <div className="border-t p-4">
        <div className="flex items-center gap-3 px-2">
          <div className="h-8 w-8 rounded-full bg-secondary flex items-center justify-center text-xs font-bold uppercase">
            {userInfo?.name?.charAt(0) || "U"}
          </div>
          <div className="flex flex-col overflow-hidden">
            <span className="truncate text-sm font-medium">
              {userInfo?.name}
            </span>
            <span className="truncate text-xs text-muted-foreground">
              {userInfo?.email}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
