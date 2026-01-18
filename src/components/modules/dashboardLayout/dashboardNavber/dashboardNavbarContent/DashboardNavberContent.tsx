"use client";

import { Menu, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { UserInfo } from "@/types/userInfo.interface";
import { DashboardNavberAvaterDropDown } from "./DashboarNavbarAvaterDropDown";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { SidebarMobileContent } from "../../dashboardSidbar/Sidebarcontent/SidebarMobileContent";
import { NavSection } from "@/types/dashboard.interfac";
import { useEffect, useState } from "react";
import Logo from "@/components/shared/Logo";
import { ModeToggle } from "@/components/shared/ThemeTogglerButton";

interface DashboardNavberContentProps {
  userInfo: UserInfo;
  navItems: NavSection[];
  dashboardHome: string;
}

export default function DashboardNavberContent({
  userInfo,
  navItems,
  dashboardHome,
}: DashboardNavberContentProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkSmallerScreen = () => {
      const mobileStatus = window.innerWidth < 1024;
      setIsMobile(mobileStatus);
      if (!mobileStatus) {
        setIsOpen(false);
      }
    };

    checkSmallerScreen();
    window.addEventListener("resize", checkSmallerScreen);

    return () => {
      window.removeEventListener("resize", checkSmallerScreen);
    };
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md transition-all">
      <div className="flex h-16 items-center justify-between px-4 sm:px-6">
        <div className="flex items-center gap-4 lg:hidden">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0 w-72">
              <SidebarMobileContent
                userInfo={userInfo}
                navItems={navItems}
                dashboardHome={dashboardHome}
              />
            </SheetContent>
          </Sheet>
        </div>
        {/* Logo */}
        <Logo brandName="Ecommarce" />
        {/* Middle: Search Bar (Hidden on Mobile) */}
        <div className="hidden max-w-lg flex-1 items-center gap-2 md:flex mx-8">
          <div className="relative w-full group">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground transition-colors group-focus-within:text-primary" />
            <Input
              placeholder="Search anything..."
              className="h-10 pl-10 pr-4 bg-muted/50 border-transparent focus-visible:bg-background transition-all focus-visible:ring-2 focus-visible:ring-primary/20 focus-visible:border-primary"
            />
          </div>
          <Button className="hidden lg:flex h-10 px-6 font-medium shadow-sm hover:shadow-md transition-all">
            Search
          </Button>
        </div>

        {/* Right Side: Actions & Profile */}
        <div className="flex items-center gap-3">
          {/* Mobile Search Icon */}
          <Button variant="ghost" size="icon" className="md:hidden">
            <Search className="h-5 w-5" />
          </Button>
          {/* saparator and Theme toggler */}
          <div className="h-8 w-px bg-border mx-2 block sm:hidden" />

          <ModeToggle />

          <div className="h-8 w-px bg-border mx-2 " />

          {/* User Profile Dropdown */}
          <div className="flex items-center transition-transform hover:scale-105">
            <DashboardNavberAvaterDropDown userInfo={userInfo} />
          </div>
        </div>
      </div>
    </header>
  );
}
