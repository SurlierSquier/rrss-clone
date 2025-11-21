import { useState } from "react";

export interface ImageData {
  id: string;
  base64: string;
  timestamp: number;
}

export const useImage = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [openModal, setOpenModal] = useState(false);

  const [images, setImages] = useState<ImageData[]>(() => {
    if (typeof window === "undefined") return [];

    const stored = window.localStorage.getItem("images");
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch (error) {
        console.error("Error loading images:", error);
        return [];
      }
    }
    return [];
  });

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
    setOpenModal(false);
  };

  const handleClose = () => {
    setSelectedFile(null);
    setPreviewUrl("");
    setOpenModal(false);
  };

  return {
    images,
    setImages,
    previewUrl,
    handleFileSelect,
    handleAddImage,
    handleClose,
    openModal,
    setOpenModal,
  };
};
