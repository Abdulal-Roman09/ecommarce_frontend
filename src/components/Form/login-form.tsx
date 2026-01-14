/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Link from "next/link";
import Logo from "../shared/Logo";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { useActionState, useEffect } from "react";
import { loginCustomer } from "@/services/auth/loginCustomer";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { toast } from "sonner";
import InputFieldError from "../shared/InputFieldError";

const initialState = {
  success: true,
  message: "",
  errors: {},
};
export default function LoginFrom({ redirect }: { redirect?: string }) {
  const [state, formAction, isPending] = useActionState(
    loginCustomer,
    initialState
  );

  useEffect(() => {
    if (state && !state.success && state.message) {
      toast.error(state.message);
    }
  }, [state]);

  return (
    <div className="flex min-h-screen items-center justify-center p-4 ">
      <Card className="w-full max-w-md shadow-md">
        <CardHeader className="space-y-1 text-center">
          <div className="flex items-center justify-center">
            <Logo brandName="Ecommarce" />
          </div>
          <CardTitle className="text-2xl font-bold">Welcome Back 👋</CardTitle>
          <p className="text-sm text-muted-foreground">
            Login to your account to continue
          </p>
        </CardHeader>

        <CardContent>
          <form action={formAction} className="grid gap-4">
            {redirect && (
              <Input type="hidden" name="redirect" value={redirect} />
            )}
            {/* Email */}
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                className="border border-primary"
                id="email"
                name="email"
                type="email"
                placeholder="exam@email.com"
              />
              <InputFieldError field="email" state={state} />
            </div>

            {/* Password */}
            <div className="grid gap-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
              </div>
              <Input
                className="border border-primary"
                id="password"
                name="password"
                type="password"
                placeholder="********"
              />
              <InputFieldError field="password" state={state} />
            </div>

            <Link
              href="/forgot-password"
              className="text-xs text-right underline text-primary font-medium"
            >
              Forgot password?
            </Link>

            <Button disabled={isPending} type="submit" className="w-full">
              {isPending ? "Logging in..." : "Login"}
            </Button>

            <div className="text-sm text-muted-foreground mt-2 text-center">
              Don&apos;t have an account?{" "}
              <Link
                href="/register"
                className="text-primary hover:underline font-medium"
              >
                Sign up
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
