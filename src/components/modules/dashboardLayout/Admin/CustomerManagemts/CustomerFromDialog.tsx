/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ICustomer } from "@/types/customer.interface";
import { Loader2, UploadCloud, UserCircle2, MapPin, Phone } from "lucide-react";
import InputFieldError from "@/components/shared/InputFieldError";
import { useEffect, useState, useActionState } from "react";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import Image from "next/image";
import {
  createCustomer,
  updateCustomer,
} from "@/services/admin/customerManagemts";

interface CustomerFormDialogProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  customer?: ICustomer | null;
}

export default function CustomerFormDialog({
  open,
  onClose,
  onSuccess,
  customer,
}: CustomerFormDialogProps) {
  const isEdit = !!customer;

  // Use action state for form handling (Server Actions)
  const [state, formAction, pending] = useActionState(
    isEdit ? updateCustomer.bind(null, customer.id!) : createCustomer,
    null,
  );

  const [gender, setGender] = useState<string>(customer?.gender || "MALE");
  const [preview, setPreview] = useState<string | null>(
    customer?.profilePhoto || null,
  );

  // Side effects for success/error notifications
  useEffect(() => {
    if (!state) return;

    if (state.success) {
      toast.success(state.message);
      onSuccess();
      onClose();
    } else if (state.message) {
      toast.error(state.message);
    }
  }, [state, onSuccess, onClose]);

  // Handle Image Preview
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-xl max-h-[90vh] overflow-y-auto border-none shadow-2xl">
        <DialogHeader className="space-y-1">
          <DialogTitle className="text-2xl font-bold flex items-center gap-2">
            <UserCircle2 className="h-7 w-7 text-blue-600" />
            {isEdit ? "Update Customer Info" : "Register New Customer"}
          </DialogTitle>
          <DialogDescription>
            {isEdit
              ? "Edit details for this customer account."
              : "Create a new customer profile with necessary details."}
          </DialogDescription>
        </DialogHeader>

        <form action={formAction} className="space-y-5 pt-4">
          {isEdit && <input type="hidden" name="id" value={customer?.id} />}

          {/* Profile Photo Upload Section */}
          <div className="flex flex-col items-center justify-center gap-3 p-4 bg-muted/30 rounded-xl border-2 border-dashed border-muted-foreground/20">
            <div className="relative h-24 w-24 rounded-full overflow-hidden border-4 border-background shadow-md">
              {preview ? (
                <Image
                  src={preview}
                  alt="Profile"
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="bg-muted h-full w-full flex items-center justify-center">
                  <UserCircle2 className="h-12 w-12 text-muted-foreground" />
                </div>
              )}
            </div>
            <label className="cursor-pointer">
              <span className="text-sm font-medium text-primary hover:underline flex items-center gap-2">
                <UploadCloud className="h-4 w-4" />
                {preview ? "Change Photo" : "Upload Photo"}
              </span>
              <input
                type="file"
                name="file"
                className="hidden"
                accept="image/*"
                onChange={handleImageChange}
              />
            </label>
          </div>

          <FieldGroup className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field className="md:col-span-2">
              <FieldLabel>Full Name</FieldLabel>
              <Input
                name="name"
                placeholder="John Doe"
                defaultValue={customer?.name}
                required
              />
              <InputFieldError field="name" state={state} />
            </Field>

            <Field>
              <FieldLabel>Email Address</FieldLabel>
              <Input
                name="email"
                type="email"
                placeholder="john@example.com"
                defaultValue={customer?.email}
                disabled={isEdit}
                className={isEdit ? "bg-muted" : ""}
              />
              <InputFieldError field="email" state={state} />
            </Field>

            {!isEdit && (
              <Field>
                <FieldLabel>Password</FieldLabel>
                <Input
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  required
                />
                <InputFieldError state={state} field="password" />
              </Field>
            )}

            <Field>
              <FieldLabel className="flex items-center gap-1.5">
                <Phone className="h-3.5 w-3.5" /> Contact Number
              </FieldLabel>
              <Input
                name="contactNumber"
                placeholder="+88017XXXXXXXX"
                defaultValue={customer?.contactNumber}
                required
              />
              <InputFieldError field="contactNumber" state={state} />
            </Field>

            <Field>
              <FieldLabel>Gender</FieldLabel>
              <input type="hidden" name="gender" value={gender} />
              <Select value={gender} onValueChange={setGender}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="MALE">Male</SelectItem>
                  <SelectItem value="FEMALE">Female</SelectItem>
                </SelectContent>
              </Select>
            </Field>

            <Field className="md:col-span-2">
              <FieldLabel className="flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5" /> Present Address
              </FieldLabel>
              <Input
                name="presentAddress"
                placeholder="House #00, Road #00, City"
                defaultValue={customer?.presentAddress || ""}
              />
              <InputFieldError field="presentAddress" state={state} />
            </Field>
          </FieldGroup>

          <DialogFooter className="gap-2 sm:gap-0 pt-6">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={pending}
              className="w-full sm:w-auto"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={pending}
              className="w-full sm:w-auto px-8"
            >
              {pending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : isEdit ? (
                "Update Profile"
              ) : (
                "Create Account"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
