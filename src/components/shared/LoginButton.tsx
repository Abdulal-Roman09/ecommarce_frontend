"use client";

import { Button } from "../ui/button";
import Link from "next/link";
import { LogIn } from "lucide-react"; 

export default function LoginButton() {
  return (
    <Button className="flex items-center gap-2">
      <LogIn className="w-4 h-4" /> 
      <Link href="/login">
        <span>Login</span>
      </Link>
    </Button>
  );
}
