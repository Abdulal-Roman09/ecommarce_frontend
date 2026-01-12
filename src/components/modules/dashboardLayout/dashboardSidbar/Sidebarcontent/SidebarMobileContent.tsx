"use client"; // typo fixed from "user client"

import Logo from "@/components/shared/Logo";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { getIconComponent } from "@/lib/icon-mapper";
import { NavSection } from "@/types/dashboard.interfac";
import { UserInfo } from "@/types/userInfo.interface";
import { LucideIcon, icons } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface SidebarMobileContentProps {
  userInfo: UserInfo;
  navItems?: NavSection[];
  dashboardHome: string;
}

export function SidebarMobileContent({
  userInfo,
  navItems = [],
  dashboardHome,
}: SidebarMobileContentProps) {
  const pathname = usePathname();

  return (
    <div>
      {/* Logo */}
      <div className="py-4 px-3">
        <Logo brandName="Ecommerce" />
      </div>
      <Separator />

      {/* Navigation */}
      <ScrollArea className="flex-1 px-3 py-4">
        <nav className="space-y-6">
          {navItems.map((section, sectionIndex) => (
            <div key={sectionIndex}>
              {section.title && (
                <h4 className="mb-2 px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  {section.title}
                </h4>
              )}

              <div className="space-y-1">
                {section.items.map((item) => {
                  const isActive = pathname === item.href;
                  const Icon = getIconComponent(item.icon);

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`flex items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors
                        ${
                          isActive
                            ? "bg-primary/10 text-primary font-medium"
                            : "text-muted-foreground hover:bg-muted"
                        }`}
                    >
                      <Icon className="h-4 w-4" />
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
    </div>
  );
}
