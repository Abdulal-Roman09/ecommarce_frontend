"use client";

import { cn } from "@/lib/utils";
import { navLinks } from "./Navlinks";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function MobileNavLinks() {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col gap-4">
      {navLinks.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={cn(
            "text-sm font-medium transition-colors",
            pathname === link.href
              ? "text-primary"
              : "text-muted-foreground hover:text-primary"
          )}
        >
          {link.name}
        </Link>
      ))}
    </nav>
  );
}
