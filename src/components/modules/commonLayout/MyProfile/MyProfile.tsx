/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getInitials } from "@/lib/formatter";
import { Button } from "@/components/ui/button";
import { useState, useTransition } from "react";
import { Camera, Loader2, Save } from "lucide-react";
import { UserInfo } from "@/types/userInfo.interface";
import { updateMyProfile } from "@/services/auth/auth.service";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface MyProfileProps {
  userInfo: UserInfo;
}

export default function MyProfile({ userInfo }: MyProfileProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const profilePhoto =
    userInfo.role === "ADMIN"
      ? userInfo.admin?.profilePhoto
      : userInfo.role === "CUSTOMER"
        ? userInfo.customer?.profilePhoto
        : (userInfo.vendor?.profilePhoto ?? null);

  const profileData =
    userInfo.role === "ADMIN"
      ? userInfo.admin
      : userInfo.role === "CUSTOMER"
        ? userInfo.customer
        : (userInfo.vendor ?? null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => setPreviewImage(reader.result as string);
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    const formData = new FormData(e.currentTarget);

    startTransition(async () => {
      const result = await updateMyProfile(formData);
      if (result.success) {
        setSuccess(result.message || "Profile updated successfully");
        setPreviewImage(null);
        router.refresh();
      } else {
        setError(result.message || "Something went wrong");
      }
    });
  };

  return (
    <>
      {" "}
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">My Profile</h1>
        <p className="text-muted-foreground mt-1.5">
          Update your personal details and profile picture
        </p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid gap-8 lg:grid-cols-12">
          {/* Left column - Avatar + basic info */}
          <div className="lg:col-span-4">
            <Card className="border-none shadow-sm bg-linear-to-b from-card to-card/80 backdrop-blur-sm">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg">Profile Photo</CardTitle>
                <CardDescription>
                  Recommended size: 400×400px (square)
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col items-center gap-6">
                <div className="group relative">
                  <Avatar className="h-40 w-40 ring-2 ring-background shadow-xl transition-all group-hover:ring-primary/40">
                    {previewImage || profilePhoto ? (
                      <AvatarImage
                        src={previewImage || profilePhoto}
                        alt={userInfo.name || "Profile"}
                        className="object-cover"
                      />
                    ) : (
                      <AvatarFallback className="text-5xl bg-linear-to-b from-primary/10 to-primary/5">
                        {getInitials(userInfo.name || "")}
                      </AvatarFallback>
                    )}
                  </Avatar>

                  <label
                    htmlFor="profile-photo"
                    className="absolute bottom-3 right-3 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-all hover:bg-primary/90 hover:scale-110 group-hover:opacity-100 opacity-90"
                  >
                    <Camera className="h-5 w-5" />
                    <Input
                      id="profile-photo"
                      name="file"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageChange}
                      disabled={isPending}
                    />
                  </label>
                </div>

                <div className="text-center space-y-1">
                  <p className="font-semibold text-xl tracking-tight">
                    {userInfo.name || "—"}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {userInfo.email}
                  </p>
                  <div className="mt-2 inline-block rounded-full bg-muted px-3 py-1 text-xs font-medium capitalize tracking-wide">
                    {userInfo.role?.toLowerCase().replace("_", " ")}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right column - Form fields */}
          <div className="lg:col-span-8">
            <Card className="border-none shadow-sm bg-linear-to-b from-card to-card/80 backdrop-blur-sm">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg">Personal Information</CardTitle>
                <CardDescription>
                  Your email cannot be changed at this time
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-6">
                {/* Messages */}
                {error && (
                  <div className="rounded-lg border border-destructive/30 bg-destructive/5 px-4 py-3 text-sm text-destructive">
                    {error}
                  </div>
                )}
                {success && (
                  <div className="rounded-lg border border-green-200 bg-green-50/70 px-4 py-3 text-sm text-green-800 dark:border-green-800/30 dark:bg-green-950/30 dark:text-green-300">
                    {success}
                  </div>
                )}

                <div className="grid gap-6 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      name="name"
                      defaultValue={profileData?.name || userInfo.name || ""}
                      required
                      disabled={isPending}
                      className="h-11 border-primary border"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={userInfo.email || ""}
                      disabled
                      className="h-11 border-primary border bg-muted/70 cursor-not-allowed"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="contactNumber">Phone Number</Label>
                    <Input
                      id="contactNumber"
                      name="contactNumber"
                      defaultValue={profileData?.contactNumber || ""}
                      required
                      disabled={isPending}
                      className="h-11 border-primary border"
                    />
                  </div>

                  {/* Vendor fields */}
                  {userInfo.role === "VENDOR" && profileData && (
                    <>
                      <div className="space-y-2">
                        <Label htmlFor="address">Business Address</Label>
                        <Input
                          id="address"
                          name="address"
                          defaultValue={(profileData as any).address || ""}
                          disabled={isPending}
                          className="h-11 border-primary border"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="gender">Gender</Label>
                        <select
                          id="gender"
                          name="gender"
                          defaultValue={(profileData as any).gender || "MALE"}
                          disabled={isPending}
                          className="h-11 border-primary w-full rounded-md border bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          <option value="MALE">Male</option>
                          <option value="FEMALE">Female</option>
                          <option value="OTHER">Other</option>
                        </select>
                      </div>
                    </>
                  )}

                  {/* Customer fields */}
                  {userInfo.role === "CUSTOMER" && profileData && (
                    <div className="space-y-2 sm:col-span-2">
                      <Label htmlFor="presentAddress">Present Address</Label>
                      <Input
                        id="presentAddress"
                        name="presentAddress"
                        defaultValue={(profileData as any).presentAddress || ""}
                        disabled={isPending}
                        className="h-11 border-primary border"
                      />
                    </div>
                  )}
                </div>

                <div className="flex justify-end pt-4">
                  <Button
                    type="submit"
                    size="lg"
                    disabled={isPending}
                    className="min-w-40 h-11 border-primary border text-base font-medium"
                  >
                    {isPending ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="mr-2 h-5 w-5" />
                        Save Changes
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </form>
    </>
  );
}
