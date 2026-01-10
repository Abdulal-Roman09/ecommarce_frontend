"use client";

import { LogOut } from "lucide-react";
import { Button } from "../ui/button";
import { logOutCustomer } from "@/services/auth/logout";
import { useRouter } from "next/navigation";

export default function LogOutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    await logOutCustomer(); 
    router.push("/login"); 
  };

  return (
    <Button
      onClick={handleLogout}
      variant="destructive"
      className="flex items-center gap-2"
    >
      <LogOut className="w-4 h-4" />
      <span>Logout</span>
    </Button>
  );
}
