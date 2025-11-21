"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { InputFile } from "./InputFile";

interface AddImageModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  handleFileSelect: (file: File | null, preview: string) => void;
  handleClose: () => void;
  handleAddImage: () => void;
  previewUrl: string;
}

export default function AddImageModal({
  open,
  setOpen,
  handleFileSelect,
  handleClose,
  handleAddImage,
  previewUrl,
}: AddImageModalProps) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Add Image</DialogTitle>
          <DialogDescription>
            Upload an image to add it to your collection. The image will be
            saved with the current timestamp.
          </DialogDescription>
        </DialogHeader>

        <div className="py-4">
          <InputFile onFileSelect={handleFileSelect} />
        </div>

        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={handleAddImage} disabled={!previewUrl}>
            Add Image
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
