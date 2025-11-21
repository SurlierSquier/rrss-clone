import { DragEvent, useRef, useState } from "react";

export const useInputFile = (onFileSelect: (file: File | null, preview: string) => void) => {
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

  return {
    preview,
    isDragging,
    inputRef,
    handleChange,
    handleDragOver,
    handleDragLeave,
    handleDrop,
    clearImage,
  };
};