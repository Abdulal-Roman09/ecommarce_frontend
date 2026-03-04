/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Calendar,
  Mail,
  MapPin,
  Phone,
  User,
  ShieldCheck,
  Clock,
} from "lucide-react";

import { formatDateTime, getInitials } from "@/lib/formatter";
import { Badge } from "@/components/ui/badge";
import { ICustomer } from "@/types/customer.interface";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { InfoRow } from "@/components/shared/InfoRow";

interface CustomerViewDetailDialogProps {
  open: boolean;
  onClose: () => void;
  customer: ICustomer | null;
}

export default function CustomerViewDetailDialog({
  onClose,
  open,
  customer,
}: CustomerViewDetailDialogProps) {
  if (!customer) {
    return null;
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] flex flex-col p-0 border-none shadow-2xl">
        <DialogHeader className="px-6 pt-6 pb-4 border-b bg-muted/20">
          <DialogTitle className="text-xl font-bold flex items-center gap-2">
            <User className="h-5 w-5 text-primary" />
            Customer Profile Details
          </DialogTitle>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-8">
          {/* Top Profile Card */}
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6 p-6 rounded-2xl bg-gradient-to-br from-muted/50 to-muted/20 border">
            <Avatar className="h-28 w-28 border-4 border-background shadow-xl">
              <AvatarImage
                src={customer.profilePhoto ?? undefined}
                className="object-cover"
              />
              <AvatarFallback className="text-3xl font-bold bg-primary text-primary-foreground">
                {getInitials(customer.name)}
              </AvatarFallback>
            </Avatar>

            <div className="flex-1 text-center md:text-left space-y-3">
              <div>
                <h2 className="text-3xl font-extrabold tracking-tight">
                  {customer.name}
                </h2>
                <p className="text-muted-foreground font-medium flex items-center justify-center md:justify-start gap-2 mt-1">
                  <Mail className="h-4 w-4" />
                  {customer.email}
                </p>
              </div>

              <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                <Badge
                  variant={customer.isDeleted ? "destructive" : "default"}
                  className="px-3 py-1"
                >
                  {customer.isDeleted ? "Banned / Inactive" : "Active Member"}
                </Badge>
                <Badge variant="outline" className="bg-background/50">
                  <ShieldCheck className="h-3 w-3 mr-1 text-green-600" />
                  Verified Customer
                </Badge>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Contact Details Section */}
            <section className="space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                <Phone className="h-4 w-4" />
                Contact Information
              </h3>
              <div className="space-y-3 p-4 rounded-xl border bg-card">
                <InfoRow
                  icon={<Phone className="h-4 w-4 text-primary" />}
                  label="Phone Number"
                  value={customer.contactNumber || "N/A"}
                />
                <Separator />
                <InfoRow
                  icon={<MapPin className="h-4 w-4 text-primary" />}
                  label="Present Address"
                  value={customer.presentAddress || "No address provided"}
                />
              </div>
            </section>

            {/* Account Metadata Section */}
            <section className="space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                <Clock className="h-4 w-4" />
                Account Activity
              </h3>
              <div className="space-y-3 p-4 rounded-xl border bg-card">
                <InfoRow
                  icon={<User className="h-4 w-4 text-primary" />}
                  label="Gender"
                  value={customer.gender === "MALE" ? "Male" : "Female"}
                />
                <Separator />
                <InfoRow
                  icon={<Calendar className="h-4 w-4 text-primary" />}
                  label="Registered On"
                  value={formatDateTime(customer.createdAt)}
                />
                <Separator />
                <InfoRow
                  icon={<Calendar className="h-4 w-4 text-primary" />}
                  label="Last Profile Update"
                  value={formatDateTime(customer.updatedAt)}
                />
              </div>
            </section>
          </div>

          {/* Quick Stats or Footer Note (Optional) */}
          {!customer.isDeleted && (
            <div className="p-4 rounded-lg bg-green-50 border border-green-100 dark:bg-green-950/20 dark:border-green-900/30">
              <p className="text-sm text-green-700 dark:text-green-400 flex items-center gap-2">
                <ShieldCheck className="h-4 w-4" />
                This customer has a valid account and can place orders.
              </p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
