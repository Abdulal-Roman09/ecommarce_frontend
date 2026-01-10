import { Menu } from "lucide-react";
import Logo from "@/components/shared/Logo";
import { Button } from "@/components/ui/button";
import DasktopNavLink from "./DasktopNavLink";
import MobileNavLinks from "./MobileNavLinks";
import { getCookie } from "@/services/auth/jwtHendeler";
import LogOutButton from "@/components/shared/LogOutButton";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import LoginButton from "@/components/shared/LoginButton";

export default async function Navbar() {
  const accessToken = await getCookie("accessToken");
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* ===== Left : Logo ===== */}
        <Logo brandName="Ecommarce" />

        {/* ======= Center:NavLinks */}
        <DasktopNavLink />

        {/* ===== Right : Auth ===== */}
        <div className="hidden md:flex items-center gap-3">
          {accessToken ? <LogOutButton /> : <LoginButton />}
        </div>

        {/* ===== Mobile Menu ===== */}
        <Sheet>
          <SheetTrigger asChild className="md:hidden">
            <Button size="icon" variant="ghost">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>

          <SheetContent side="right" className="w-88 pl-4">
            <div className="flex flex-col gap-6 mt-6">
              {/* Logo */}

              {/* Auth Section */}
              <div className="flex justify-between mt-5 pr-4">
                <Logo brandName="Ecommarce" />
                {accessToken ? <LogOutButton /> : <LoginButton />}
              </div>

              {/* Center itesm link */}
              <MobileNavLinks />
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
