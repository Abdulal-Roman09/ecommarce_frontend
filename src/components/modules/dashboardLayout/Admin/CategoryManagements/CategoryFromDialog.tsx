"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";

import { toast } from "sonner";
import { useActionState, useEffect, useRef } from "react";
import { Loader2, UploadCloud } from "lucide-react";

import InputFieldError from "@/components/shared/InputFieldError";
import { createCategory } from "@/services/admin/categoryManagement";

interface ICategoryFromDialogProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function CategoryFromDialog({
  open,
  onClose,
  onSuccess,
}: ICategoryFromDialogProps) {
  
  const [state, formAction, pending] = useActionState(createCategory, null);
  const handledRef = useRef(false);

  useEffect(() => {
    if (state?.success && !handledRef.current) {
      handledRef.current = true;

      toast.success(state.message);
      onSuccess();
      onClose();
    }

    if (state && !state.success) {
      toast.error(state.message);
    }
  }, [state, onSuccess, onClose]);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-xl">Create New Category</DialogTitle>
          <DialogDescription>
            Add a new category to organize your products.
          </DialogDescription>
        </DialogHeader>

        <form action={formAction} className="space-y-2 pt-4">
          <FieldGroup>
            <Field>
              <FieldLabel>Category Title</FieldLabel>
              <Input
                name="title"
                placeholder="SSD, Processor, RAM"
                className="border border-primary/80"
              />
              <InputFieldError field="title" state={state} />
            </Field>

            <Field>
              <FieldLabel className="flex items-center gap-2">
                <UploadCloud className="h-4 w-4" />
                Upload Icon
                <span className="text-xs text-muted-foreground">
                  (optional)
                </span>
              </FieldLabel>
              <Input
                name="file"
                type="file"
                accept="image/*"
                className="cursor-pointer border border-primary/80"
              />
            </Field>
          </FieldGroup>

          <DialogFooter className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
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
              ) : (
                "Save Category"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
