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

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { IVendor } from "@/types/vendor.interfac";
import { Loader2, UploadCloud } from "lucide-react";
import { ICategory } from "@/types/category.interface";
import { useEffect, useState, useActionState } from "react";
import InputFieldError from "@/components/shared/InputFieldError";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { createVendor, updateVendor } from "@/services/admin/VendorManagement";
import { toast } from "sonner";

interface VendorFromDialogProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  vendor?: IVendor | null;
  categories?: ICategory[];
}

export default function VendorFromDialog({
  open,
  onClose,
  onSuccess,
  vendor,
  categories = [],
}: VendorFromDialogProps) {
  const isEdit = !!vendor;

  const [state, formAction, pending] = useActionState(
    isEdit ? updateVendor.bind(null, vendor.id!) : createVendor,
    null,
  );

  const [selectedCategory, setSelectedCategory] = useState("");
  const [gender, setGender] = useState<string>(vendor?.gender || "MALE");

  useEffect(() => {
    if (state?.success) {
      toast.success(state.message);
      onSuccess();
      onClose();
    } else if (state && !state.success) {
      toast.error(state.message);
    }
  }, [state, onSuccess, onClose]);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl">
            {isEdit ? "Update Vendor" : "Create New Vendor"}
          </DialogTitle>
          <DialogDescription>
            {isEdit
              ? "Update the details of the existing vendor."
              : "Add a new vendor to your system."}
          </DialogDescription>
        </DialogHeader>

        <form action={formAction} className="space-y-4 pt-4">
          {/* Hidden ID for Edit mode */}
          {isEdit && <input type="hidden" name="id" value={vendor?.id} />}

          <FieldGroup className="space-y-4">
            <Field>
              <FieldLabel>Full Name</FieldLabel>
              <Input
                name="name"
                id="name"
                placeholder="Enter vendor name"
                defaultValue={isEdit ? vendor?.name : undefined}
                required
              />
              <InputFieldError field="name" state={state} />
            </Field>

            <Field>
              <FieldLabel>Email Address</FieldLabel>
              <Input
                name="email"
                id="email"
                type="email"
                placeholder="vendor@example.com"
                defaultValue={isEdit ? vendor?.email : undefined}
                disabled={isEdit}
              />
              <InputFieldError field="email" state={state} />
            </Field>

            {!isEdit && (
              <Field>
                <FieldLabel htmlFor="password">Password</FieldLabel>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Enter password"
                  required={!isEdit}
                />
                <InputFieldError state={state} field="password" />
              </Field>
            )}

            <Field>
              <FieldLabel>Category</FieldLabel>
              <input type="hidden" name="category" value={selectedCategory} />
              <Select
                value={selectedCategory}
                onValueChange={setSelectedCategory}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.length > 0 ? (
                    categories.map((cat) => (
                      <SelectItem key={cat.id} value={cat.id}>
                        {cat.title}
                      </SelectItem>
                    ))
                  ) : (
                    <SelectItem value="none" disabled>
                      No category available
                    </SelectItem>
                  )}
                </SelectContent>
              </Select>
              <InputFieldError state={state} field="category" />
            </Field>

            <Field>
              <FieldLabel>Gender</FieldLabel>
              <input type="hidden" name="gender" value={gender} />
              <Select value={gender} onValueChange={setGender}>
                <SelectTrigger>
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="MALE">Male</SelectItem>
                  <SelectItem value="FEMALE">Female</SelectItem>
                </SelectContent>
              </Select>
              <InputFieldError state={state} field="gender" />
            </Field>

            <Field>
              <FieldLabel className="flex items-center gap-2">
                <UploadCloud className="h-4 w-4" />
                Profile Photo
              </FieldLabel>
              <Input
                name="file"
                type="file"
                accept="image/*"
                className="cursor-pointer"
              />
            </Field>

            <Field>
              <FieldLabel>Address</FieldLabel>
              <Input
                name="address"
                placeholder="123 Main St, City"
                defaultValue={vendor?.address}
              />
              <InputFieldError state={state} field="address" />
            </Field>

            <Field>
              <FieldLabel>Contact Number</FieldLabel>
              <Input
                name="contactNumber"
                placeholder="+1234567890"
                defaultValue={vendor?.contactNumber}
              />
              <InputFieldError state={state} field="contactNumber" />
            </Field>
          </FieldGroup>

          <DialogFooter className="gap-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={pending}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={pending}>
              {pending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : isEdit ? (
                "Update Vendor"
              ) : (
                "Save Vendor"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
