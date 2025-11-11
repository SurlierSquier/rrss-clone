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
import { useState } from "react";
import { ImageData } from "../page";
import { InputFile } from "./InputFile";

interface AddImageModalProps {
  images: ImageData[];
  setImages: (images: ImageData[]) => void;
  open: boolean;
  setOpen: (open: boolean) => void;
}

export default function AddImageModal({
  images,
  setImages,
  open,
  setOpen,
}: AddImageModalProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");

  const handleFileSelect = (file: File | null, preview: string) => {
    setSelectedFile(file);
    setPreviewUrl(preview);
  };

  const handleAddImage = () => {
    if (!previewUrl) return;

    const newImage: ImageData = {
      id: selectedFile?.name + Date.now().toString(),
      base64: previewUrl,
      timestamp: Date.now(),
    };

    const newImages = [...images, newImage];
    setImages(newImages);

    window.localStorage.setItem("images", JSON.stringify(newImages));

    setSelectedFile(null);
    setPreviewUrl("");
    setOpen(false);
  };

  const handleClose = () => {
    setSelectedFile(null);
    setPreviewUrl("");
    setOpen(false);
  };

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
