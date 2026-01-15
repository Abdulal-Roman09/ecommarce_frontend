import InputFieldError from "@/components/shared/InputFieldError";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { createCategory } from "@/services/admin/categoryManagement";
import { Loader2, PlusCircle, UploadCloud } from "lucide-react"; // Icons for better UI
import { useActionState, useEffect } from "react";
import { toast } from "sonner";

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
  const [state, fromAction, pending] = useActionState(createCategory, null);

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
      <DialogContent className="sm:max-w-106">
        <DialogHeader>
          <div className="flex items-center gap-2">
            <PlusCircle className="w-5 h-5 text-primary" />
            <DialogTitle className="text-xl font-semibold">
              Create New Category
            </DialogTitle>
          </div>
          <DialogDescription>
            Add a new category to organize your products. Click save when {"you're"}
            done.
          </DialogDescription>
        </DialogHeader>

        <form action={fromAction} className="space-y-6 pt-4">
          <FieldGroup className="space-y-4">
            <Field>
              <FieldLabel htmlFor="name" className="text-sm font-medium">
                Category Title
              </FieldLabel>
              <Input
                id="name"
                name="name" 
                placeholder="e.g. SSD, Processor, RAM"
                className="mt-1.5"
              />
              <InputFieldError field="name" state={state} />
            </Field>

            <Field>
              <FieldLabel
                htmlFor="file"
                className="text-sm font-medium flex items-center gap-1.5"
              >
                <UploadCloud className="w-4 h-4 text-muted-foreground" />
                Upload Icon{" "}
                <span className="text-xs text-muted-foreground font-normal">
                  (Optional)
                </span>
              </FieldLabel>
              <Input
                id="file"
                name="file"
                type="file"
                accept="image/*"
                className="mt-1.5 cursor-pointer file:bg-primary/10 file:text-primary file:border-0 file:rounded-md file:px-2 file:py-0.5 hover:file:bg-primary/20 transition-all"
              />
            </Field>
          </FieldGroup>

          <DialogFooter className="gap-2 sm:gap-0">
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
              className="w-full sm:w-auto min-w-26"
            >
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
