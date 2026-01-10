"use client";

import { cn } from "@/lib/utils";
import { navLinks } from "./Navlinks";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function DasktopNavLink() {
  const pathname = usePathname();

  return (
    <nav className="hidden md:flex items-center gap-6">
      {navLinks.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={cn(
            "text-sm font-medium transition-colors hover:text-primary",
            pathname === link.href
              ? "text-primary"
              : "text-muted-foreground"
          )}
        >
          {link.name}
        </Link>
      ))}
    </nav>
  );
}
