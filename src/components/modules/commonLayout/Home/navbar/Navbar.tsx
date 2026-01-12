import { Menu } from "lucide-react";
import Logo from "@/components/shared/Logo";
import DasktopNavLink from "./DasktopNavLink";
import MobileNavLinks from "./MobileNavLinks";
import { Button } from "@/components/ui/button";
import { getCookie } from "@/services/auth/jwtHendeler";
import LoginButton from "@/components/shared/LoginButton";
import LogOutButton from "@/components/shared/LogOutButton";
// import ThemeToggleButton from "@/components/shared/ThemeTogglerButton";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export default async function Navbar() {
  const accessToken = await getCookie("accessToken");

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* ===== Left : Logo ===== */}
        <div className="flex items-center gap-2">
          <div className="md:hidden">
            <Logo brandName="" />
          </div>
          <div className="hidden md:flex">
            <Logo brandName="Ecommarce" />
          </div>
        </div>

        {/* ===== Center : Desktop Nav ===== */}
        <DasktopNavLink />

        {/* ===== Right : Desktop Actions ===== */}
        <div className="hidden md:flex items-center gap-4">
          {/* <ThemeToggleButton /> */}
          {accessToken ? <LogOutButton /> : <LoginButton />}
        </div>

        {/* ===== Mobile Menu ===== */}
        <Sheet>
          <SheetTrigger asChild className="md:hidden">
            <Button size="icon" variant="ghost">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>

          <SheetContent side="right" className="w-[320px] px-4">
            <div className="flex flex-col gap-6 mt-4">
              {/* Top Row */}
              <div className="flex items-center justify-between">
                <Logo brandName="Ecommarce" />
                {/* <ThemeToggleButton /> */}
              </div>

              {/* Auth */}
              <div>{accessToken ? <LogOutButton /> : <LoginButton />}</div>

              {/* Nav Links */}
              <MobileNavLinks />
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
