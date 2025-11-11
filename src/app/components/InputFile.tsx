"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload, X } from "lucide-react";
import Image from "next/image";
import { DragEvent, useRef, useState } from "react";

interface InputFileProps {
  onFileSelect: (file: File | null, preview: string) => void;
}

export function InputFile({ onFileSelect }: InputFileProps) {
  const [preview, setPreview] = useState<string>("");
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File | null) => {
    if (!file) {
      setPreview("");
      onFileSelect(null, "");
      return;
    }

    if (file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setPreview(result);
        onFileSelect(file, result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    handleFile(file);
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0] || null;
    handleFile(file);
  };

  const clearImage = () => {
    setPreview("");
    onFileSelect(null, "");
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  return (
    <div className="grid w-full items-center gap-3">
      <Label htmlFor="picture">Image</Label>

      {!preview ? (
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => inputRef.current?.click()}
          className={`
            border-2 border-dashed rounded-lg p-8 text-center cursor-pointer
            transition-colors duration-200
            ${
              isDragging
                ? "border-primary bg-primary/10"
                : "border-muted-foreground/25 hover:border-primary/50"
            }
          `}
        >
          <Upload className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
          <p className="text-sm text-muted-foreground mb-2">
            Drag & drop your image here, or click to select
          </p>
          <p className="text-xs text-muted-foreground">
            Supports: JPG, PNG, GIF, WEBP
          </p>
        </div>
      ) : (
        <div className="relative rounded-lg overflow-hidden border border-border">
          <Image
            src={preview}
            alt="Preview"
            width={400}
            height={300}
            className="w-full h-auto max-h-[300px] object-contain"
          />
          <button
            onClick={clearImage}
            className="absolute top-2 right-2 p-1 bg-destructive text-destructive-foreground rounded-full hover:bg-destructive/90 transition-colors"
            type="button"
          >
            <X className="h-4 w-4 text-white" />
          </button>
        </div>
      )}

      <Input
        ref={inputRef}
        id="picture"
        type="file"
        accept="image/*"
        onChange={handleChange}
        className="hidden"
      />
    </div>
  );
}
