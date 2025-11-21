import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";

import { Trash } from "lucide-react";
import { ImageData } from "../hooks/useImage";

interface ImageContainerProps {
  images: ImageData[];
  setImages: (images: ImageData[]) => void;
}

export default function ImageContainer({
  images,
  setImages,
}: ImageContainerProps) {
  const handleDelete = (id: string) => {
    const newImages = images.filter((image) => image.id !== id);
    setImages(newImages);
    window.localStorage.setItem("images", JSON.stringify(newImages));
  };
  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = Math.floor(
      (now.getTime() - date.getTime()) / (1000 * 60 * 60)
    );

    if (diffInHours < 24) {
      if (diffInHours < 1) return "Just now";
      return `${diffInHours}h ago`;
    }

    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays}d ago`;

    return date.toLocaleDateString();
  };

  if (images.length === 0) {
    return (
      <div className="flex flex-col gap-6">
        {[1].map((index) => (
          <div
            key={index}
            className="border border-border rounded-lg overflow-hidden bg-card"
          >
            <Skeleton className="w-full aspect-square" />
            <div className="p-4">
              <Skeleton className="h-4 w-24 mb-2" />
              <Skeleton className="h-3 w-32" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      {images.map((image) => (
        <article
          key={image.id}
          className="border-2 rounded-lg overflow-hidden bg-card"
        >
          <div className="relative w-full aspect-square bg-black">
            <button
              onClick={() => handleDelete(image.id)}
              className="absolute bg-white rounded-full hover:cursor-pointer group p-2 top-2 right-2 z-10"
            >
              <Trash className="text-red-600 group-hover:size-8 transition-all" />
            </button>
            <Image
              src={image.base64}
              alt="Uploaded image"
              fill
              className="object-cover object-center"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>

          <div className="p-4">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-foreground">
                {image.id.split(".")[0] + " - " + image.id.split(".")[1]}
              </p>
              <p className="text-xs text-muted-foreground">
                {formatDate(image.timestamp)}
              </p>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
