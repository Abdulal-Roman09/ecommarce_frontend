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
  Star,
  Stethoscope,
  User,
} from "lucide-react";

import { formatDateTime, getInitials } from "@/lib/formatter";
import { Badge } from "@/components/ui/badge";
import { IVendor } from "@/types/vendor.interfac";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { InfoRow } from "@/components/shared/InfoRow";

interface VendorViewDetailDialogProps {
  open: boolean;
  onClose: () => void;
  vendor: IVendor | null;
}

export default function VendorViewDetailDialog({
  onClose,
  open,
  vendor,
}: VendorViewDetailDialogProps) {
  if (!vendor) {
    return null;
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="min-w-5xl max-h-[90vh] flex flex-col p-0">
        <DialogHeader className="px-6 pt-6 pb-4 border-b">
          <DialogTitle className="text-xl font-semibold">
            Vendor Profile
          </DialogTitle>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto px-6 pb-6 space-y-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 p-6 rounded-xl bg-muted/40">
            <Avatar className="h-24 w-24 border shadow-sm">
              <AvatarImage src={vendor.profilePhoto ?? undefined} />
              <AvatarFallback className="text-2xl font-semibold">
                {getInitials(vendor.name)}
              </AvatarFallback>
            </Avatar>

            <div className="flex-1 text-center sm:text-left space-y-2">
              <h2 className="text-3xl font-bold">{vendor.name}</h2>

              <p className="text-sm text-muted-foreground flex items-center justify-center sm:justify-start gap-2">
                <Mail className="h-4 w-4" />
                {vendor.email}
              </p>

              <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
                <Badge variant={vendor.isDelete ? "destructive" : "default"}>
                  {vendor.isDelete ? "Inactive" : "Active"}
                </Badge>

                {vendor.rating !== undefined && (
                  <Badge variant="secondary">
                    <Star className="h-3 w-3 mr-1" />
                    {vendor.rating.toFixed(1)}
                  </Badge>
                )}
              </div>
            </div>
          </div>

          {/* Category */}
          {vendor.categories?.length > 0 && (
            <section className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <Stethoscope className="h-5 w-5 text-primary" />
                Categories
              </h3>

              <div className="flex flex-wrap gap-2">
                {vendor.categories.map((category, i) => (
                  <Badge key={i} variant="outline" className="px-4 py-1.5">
                    {category.title ?? "Unknown"}
                  </Badge>
                ))}
              </div>
            </section>
          )}

          <Separator />

          {/* Contact Info */}
          <section className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Phone className="h-5 w-5 text-primary" />
              Contact Information
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 rounded-lg bg-muted/40 p-4">
              <InfoRow
                icon={<Phone className="h-4 w-4" />}
                label="Contact Number"
                value={vendor.contactNumber || "Not provided"}
              />
              <InfoRow
                icon={<Mail className="h-4 w-4" />}
                label="Email"
                value={vendor.email}
              />
              <InfoRow
                icon={<MapPin className="h-4 w-4" />}
                label="Address"
                value={vendor.address || "Not provided"}
                className="md:col-span-2"
              />
            </div>
          </section>

          <Separator />

          {/* Personal Info */}
          <section className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <User className="h-5 w-5 text-primary" />
              Personal Information
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 rounded-lg bg-muted/40 p-4">
              <InfoRow
                icon={<User className="h-4 w-4" />}
                label="Gender"
                value={
                  vendor.gender
                    ? vendor.gender.charAt(0) +
                      vendor.gender.slice(1).toLowerCase()
                    : "Not specified"
                }
              />
              <InfoRow
                icon={<Calendar className="h-4 w-4" />}
                label="Joined On"
                value={formatDateTime(vendor.createdAt)}
              />
              <InfoRow
                icon={<Calendar className="h-4 w-4" />}
                label="Last Updated"
                value={formatDateTime(vendor.updatedAt)}
              />
              {vendor.rating !== undefined && (
                <InfoRow
                  icon={<Star className="h-4 w-4" />}
                  label="Average Rating"
                  value={`${vendor.rating.toFixed(1)} / 5`}
                />
              )}
            </div>
          </section>
        </div>
      </DialogContent>
    </Dialog>
  );
}
