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
  Tag,
  Store,
  AlignLeft,
  Link as LinkIcon,
  ShieldCheck,
  Clock,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { IBrand } from "@/types/brand.interface";
import { Separator } from "@/components/ui/separator";
import { InfoRow } from "@/components/shared/InfoRow";
import { formatDateTime, getInitials } from "@/lib/formatter";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface BrandViewDetailDialogProps {
  open: boolean;
  onClose: () => void;
  brand: IBrand | null;
}

export default function BrandViewDetailDialog({
  onClose,
  open,
  brand,
}: BrandViewDetailDialogProps) {
  if (!brand) {
    return null;
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] flex flex-col p-0 border-none shadow-2xl overflow-hidden">
        <DialogHeader className="px-6 pt-6 pb-4 border-b bg-muted/20">
          <DialogTitle className="text-xl font-bold flex items-center gap-2">
            <Tag className="h-5 w-5 text-primary" />
            Brand Profile Details
          </DialogTitle>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-8">
          {/* Top Profile Card */}
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6 p-6 rounded-2xl bg-gradient-to-br from-muted/50 to-muted/20 border">
            <Avatar className="h-28 w-28 border-4 border-background shadow-xl rounded-xl bg-white">
              <AvatarImage
                src={brand.logo ?? undefined}
                className="object-contain p-2"
              />
              <AvatarFallback className="text-3xl font-bold bg-primary text-primary-foreground rounded-xl">
                {getInitials(brand.name)}
              </AvatarFallback>
            </Avatar>

            <div className="flex-1 text-center md:text-left space-y-3">
              <div>
                <h2 className="text-3xl font-extrabold tracking-tight">
                  {brand.name}
                </h2>
                <p className="text-muted-foreground font-medium flex items-center justify-center md:justify-start gap-2 mt-1">
                  <LinkIcon className="h-4 w-4" />
                  {brand.slug || "no-slug"}
                </p>
              </div>

              <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                <Badge
                  variant={brand.isActive ? "default" : "secondary"}
                  className="px-3 py-1"
                >
                  {brand.isActive ? "Active Brand" : "Inactive"}
                </Badge>
                <Badge
                  variant={brand.isDeleted ? "destructive" : "outline"}
                  className="px-3 py-1 bg-background/50"
                >
                  {brand.isDeleted ? "In Trash" : "Visible in Shop"}
                </Badge>
              </div>
            </div>
          </div>

          {/* Description Section */}
          <section className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
              <AlignLeft className="h-4 w-4" />
              Brand Description
            </h3>
            <div className="p-4 rounded-xl border bg-card text-sm leading-relaxed text-foreground/80">
              {brand.description || "No description provided for this brand."}
            </div>
          </section>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Vendor Association Section */}
            <section className="space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                <Store className="h-4 w-4" />
                Vendor Information
              </h3>
              <div className="space-y-3 p-4 rounded-xl border bg-card">
                <InfoRow
                  icon={<Store className="h-4 w-4 text-primary" />}
                  label="Vendor Name"
                  value={brand.vendor?.name || "Independent Brand"}
                />
                <Separator />
                <InfoRow
                  icon={<ShieldCheck className="h-4 w-4 text-primary" />}
                  label="Vendor ID"
                  value={brand.vendorId || "N/A"}
                />
              </div>
            </section>

            {/* Timestamps Section */}
            <section className="space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                <Clock className="h-4 w-4" />
                System Timestamps
              </h3>
              <div className="space-y-3 p-4 rounded-xl border bg-card">
                <InfoRow
                  icon={<Calendar className="h-4 w-4 text-primary" />}
                  label="Created At"
                  value={formatDateTime(brand.createdAt)}
                />
                <Separator />
                <InfoRow
                  icon={<Calendar className="h-4 w-4 text-primary" />}
                  label="Last Updated"
                  value={formatDateTime(brand.updatedAt)}
                />
              </div>
            </section>
          </div>

          {/* Product Count Notification (Optional) */}
          <div className="p-4 rounded-lg bg-blue-50 border border-blue-100 dark:bg-blue-950/20 dark:border-blue-900/30">
            <p className="text-sm text-blue-700 dark:text-blue-400 flex items-center gap-2">
              <Tag className="h-4 w-4" />
              This brand is currently linked with products in your inventory.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
