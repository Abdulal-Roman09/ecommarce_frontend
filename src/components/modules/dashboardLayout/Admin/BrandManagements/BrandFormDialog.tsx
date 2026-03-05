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

import Image from "next/image";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { IBrand } from "@/types/brand.interface";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useState, useActionState } from "react";
import InputFieldError from "@/components/shared/InputFieldError";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Loader2, UploadCloud, Tag, Store, AlignLeft } from "lucide-react";
import { createBrand, updateBrand } from "@/services/admin/brandManagement";

interface BrandFormDialogProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  brand?: IBrand | null;
  vendors: { id: string; name: string }[];
}

export default function BrandFormDialog({
  open,
  onClose,
  onSuccess,
  brand,
  vendors,
}: BrandFormDialogProps) {
  const isEdit = !!brand;


  const [state, formAction, pending] = useActionState(
    isEdit ? updateBrand.bind(null, brand.id!) : createBrand,
    null
  );

  const [vendorId, setVendorId] = useState<string>(brand?.vendorId || "");
  const [preview, setPreview] = useState<string | null>(brand?.logo || null);


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
            <Tag className="h-7 w-7 text-blue-600" />
            {isEdit ? "Update Brand Details" : "Create New Brand"}
          </DialogTitle>
          <DialogDescription>
            {isEdit
              ? "Modify the brand information and associations."
              : "Add a new brand to your inventory system."}
          </DialogDescription>
        </DialogHeader>

        <form action={formAction} className="space-y-5 pt-4">
          {/* Brand Logo Upload Section */}
          <div className="flex flex-col items-center justify-center gap-3 p-4 bg-muted/30 rounded-xl border-2 border-dashed border-muted-foreground/20">
            <div className="relative h-24 w-24 rounded-lg overflow-hidden border-4 border-background shadow-md bg-white">
              {preview ? (
                <Image
                  src={preview}
                  alt="Brand Logo"
                  fill
                  className="object-contain p-1"
                />
              ) : (
                <div className="bg-muted h-full w-full flex items-center justify-center">
                  <Tag className="h-10 w-10 text-muted-foreground" />
                </div>
              )}
            </div>
            <label className="cursor-pointer">
              <span className="text-sm font-medium text-primary hover:underline flex items-center gap-2">
                <UploadCloud className="h-4 w-4" />
                {preview ? "Change Logo" : "Upload Logo"}
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
              <FieldLabel>Brand Name</FieldLabel>
              <Input
                name="name"
                placeholder="e.g. Samsung, Apple"
                defaultValue={brand?.name}
                required
              />
              <InputFieldError field="name" state={state} />
            </Field>

            <Field>
              <FieldLabel>Slug</FieldLabel>
              <Input
                name="slug"
                placeholder="brand-slug-url"
                defaultValue={brand?.slug || ""}
              />
              <InputFieldError field="slug" state={state} />
            </Field>

            <Field>
              <FieldLabel className="flex items-center gap-1.5">
                <Store className="h-3.5 w-3.5" /> Select Vendor
              </FieldLabel>
              <input type="hidden" name="vendorId" value={vendorId} />
              <Select value={vendorId} onValueChange={setVendorId}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose a vendor" />
                </SelectTrigger>
                <SelectContent>
                  {vendors.map((v) => (
                    <SelectItem key={v.id} value={v.id}>
                      {v.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <InputFieldError field="vendorId" state={state} />
            </Field>

            <Field className="md:col-span-2">
              <FieldLabel className="flex items-center gap-1.5">
                <AlignLeft className="h-3.5 w-3.5" /> Description
              </FieldLabel>
              <Textarea
                name="description"
                placeholder="Write a brief about the brand..."
                className="resize-none"
                rows={3}
                defaultValue={brand?.description || ""}
              />
              <InputFieldError field="description" state={state} />
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
                "Update Brand"
              ) : (
                "Create Brand"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}