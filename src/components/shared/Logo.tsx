import Link from "next/link";
import { ShoppingCart } from "lucide-react";

interface LogoProps {
  brandName: string;
}

export default function Logo({ brandName = "Ecommarce" }: LogoProps) {
  return (
    <Link href={"/"} className="flex items-center justify-center gap-2">
      <div className="relative">
        <div className="absolute inset-0  rounded-lg blur-sm opacity-50"></div>
        <div className="relative  p-2 rounded-lg">
          <ShoppingCart className=" text-primary" size={30} />
        </div>
      </div>
      <div className="flex flex-col">
        <span className="text-xl font-bold ">{brandName}</span>
      </div>
    </Link>
  );
}
