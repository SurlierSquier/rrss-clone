import { useEffect, useState } from "react";

export interface ImageData {
  id: string;
  base64: string;
  timestamp: number;
}

export const useImage = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [openModal, setOpenModal] = useState(false);

  const [images, setImages] = useState<ImageData[]>([]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = window.localStorage.getItem("images");
      if (stored) {
        try {
          const parsedImages = JSON.parse(stored);

          const now = Date.now();
          const validImages = parsedImages.filter((image: ImageData) => {
            const diff = now - image.timestamp;
            return diff < 24 * 60 * 60 * 1000;
          });

          setTimeout(() => {
            setImages(validImages);
          }, 0);

          if (parsedImages.length !== validImages.length) {
            window.localStorage.setItem("images", JSON.stringify(validImages));
          }
        } catch (error) {
          console.error("Error loading images:", error);
        }
      }
    }
  }, []);

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
