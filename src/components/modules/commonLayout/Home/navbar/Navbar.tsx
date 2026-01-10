"use client";

import Link from "next/link";
import { Menu } from "lucide-react";
import Logo from "@/components/shared/Logo";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import DasktopNavLink from "./DasktopNavLink";
import MobileNavLinks from "./MobileNavLinks";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* ===== Left : Logo ===== */}
        <Logo brandName="Ecommarce" />

        {/* ======= Center:NavLinks */}
        <DasktopNavLink />

        {/* ===== Right : Auth ===== */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/login"
            className="text-sm font-medium transition-colors bg-primary  px-6 py-2 rounded-2xl "
          >
            <span className="text-white"> Login</span>
          </Link>
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
              <Logo brandName="Ecommarce" />

              {/* Center itesm link */}
              <MobileNavLinks />

              {/* Auth Section */}
              <div className="flex flex-col gap-3 pt-4 border-t px-15">
                <Link
                  href="/login"
                  className="text-sm font-medium transition-colors bg-primary  px-6 py-2 rounded-2xl "
                >
                  <span className="text-white"> Login</span>
                </Link>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
