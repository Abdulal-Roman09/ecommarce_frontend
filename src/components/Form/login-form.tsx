/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { loginCustomer } from "@/services/auth/loginCustomer";
import { useActionState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import Link from "next/link";
import Logo from "../shared/Logo";

export default function LoginFrom() {
  const [state, formAction, isPending] = useActionState(loginCustomer, null);
  console.log(state);

  const getFieldError = (fieldName: string) => {
    if (state && state.success === false && state.errors) {
      const error = state.errors.find((err: any) => err.field === fieldName);
      return error ? error.message : null;
    }
    return null;
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-4 ">
      <Card className="w-full max-w-md shadow-md">
        <CardHeader className="space-y-1 text-center">
          <Logo brandName="Ecommarce" />
          <CardTitle className="text-2xl font-bold">Welcome Back 👋</CardTitle>
          <p className="text-sm text-muted-foreground">
            Login to your account to continue
          </p>
        </CardHeader>

        <CardContent>
          <form action={formAction} className="grid gap-4">
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
              {getFieldError("email") && (
                <p className="text-red-600 text-xs font-medium">
                  {getFieldError("email")}
                </p>
              )}
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
              {getFieldError("password") && (
                <p className="text-red-600 text-xs font-medium">
                  {getFieldError("password")}
                </p>
              )}
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
