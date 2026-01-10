/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Link from "next/link";
import Logo from "../shared/Logo";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useActionState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { RegisterCustomer } from "@/services/auth/registerCustomer";

export default function RegisterForm() {
  const [state, fromAction, isPanding] = useActionState(RegisterCustomer, null);
  const getFieldError = (fieldName: string) => {
    if (state && state.success === false && state.errors) {
      const error = state.errors.find((err: any) => err.field === fieldName);
      return error ? error.message : null;
    }
    return null;
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-4 ">
      <Card className="w-full max-w-2xl shadow-2xl">
        <CardHeader className="space-y-1 text-center ">
          <Logo brandName="Ecommarce" />
          <CardTitle className="text-3xl font-bold tracking-tight">
            Create an Account
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Enter your details below to create your account
          </p>
        </CardHeader>

        <CardContent>
          <form action={fromAction} className="grid gap-6">
            <div className="grid gap-2">
              <Label htmlFor="fullname">Full Name</Label>
              <Input
                className="border border-primary"
                id="name"
                name="name"
                type="text"
                placeholder="John Doe"
              />
              {getFieldError("name") && (
                <p className="text-red-600 text-xs font-medium">
                  {getFieldError("name")}
                </p>
              )}
            </div>

            {/*  Email-Password  Side by Side */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Email Field */}
              <div className="grid gap-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  className="border border-primary"
                  id="email"
                  name="email"
                  type="email"
                  placeholder="examm@email.com"
                />
                {getFieldError("email") && (
                  <p className="text-red-600 text-xs font-medium">
                    {getFieldError("email")}
                  </p>
                )}
              </div>
              {/* Password Field */}
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
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
            </div>

            {/* Contact Number & Address - Side by Side */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Contact Number Field */}
              <div className="grid gap-2">
                <Label htmlFor="contactNumber">Contact Number</Label>
                <Input
                  className="border border-primary"
                  id="contactNumber"
                  name="contactNumber"
                  type="tel"
                  placeholder="+880 13XX XXXXXX"
                />
                {getFieldError("contactNumber") && (
                  <p className="text-red-600 text-xs font-medium">
                    {getFieldError("contactNumber")}
                  </p>
                )}
              </div>

              {/* Address Field - FIXED: Error is now inside the grid div */}
              <div className="grid gap-2">
                <Label htmlFor="presentAddress">Present Address</Label>
                <Input
                  className="border border-primary"
                  id="presentAddress"
                  name="presentAddress"
                  placeholder="Street, City, Country"
                />
                {getFieldError("presentAddress") && (
                  <p className="text-red-600 text-xs font-medium">
                    {getFieldError("presentAddress")}
                  </p>
                )}
              </div>
            </div>
            <Button
              type="submit"
              disabled={isPanding}
              className="w-full text-lg h-11"
            >
              {isPanding ? " Create Account....." : " Create Account"}
            </Button>

            <div className="text-center text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link
                href="/login"
                className="text-primary hover:underline font-medium"
              >
                Login
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
