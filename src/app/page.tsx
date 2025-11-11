"use client";
import { useState } from "react";
import AddImageButton from "./components/AddImageButton";
import AddImageModal from "./components/AddImageModal";
import ImageContainer from "./components/ImageContainer";
import StoryContainer from "./components/StoryContainer";

export interface ImageData {
  id: string;
  base64: string;
  timestamp: number;
}

export default function Home() {
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

  return (
    <div className="flex min-h-screen font-sans bg-black">
      <main className="flex flex-col w-full gap-8 py-8 px-4 md:px-8">
        <div className="flex gap-8 w-full max-w-6xl mx-auto">
          <StoryContainer />
        </div>

        <div className="flex gap-8 w-full max-w-6xl mx-auto">
          <div className="flex-1 max-w-2xl">
            <ImageContainer images={images} setImages={setImages} />
          </div>

          <aside className="hidden md:block w-80 sticky top-8 h-fit">
            <div className="border border-border rounded-lg p-6 bg-card">
              <h2 className="text-lg font-semibold mb-4 text-foreground">
                Your Gallery
              </h2>
              <p className="text-sm text-muted-foreground mb-4">
                {images.length} {images.length === 1 ? "image" : "images"}
              </p>
              <AddImageButton setOpenPopover={setOpenModal} />
            </div>
          </aside>

          <div className="md:hidden fixed bottom-6 right-6 z-50">
            <AddImageButton setOpenPopover={setOpenModal} />
          </div>
        </div>
      </main>

      <AddImageModal
        images={images}
        setImages={setImages}
        open={openModal}
        setOpen={setOpenModal}
      />
    </div>
  );
}
