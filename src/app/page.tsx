"use client";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import AddImageButton from "./components/AddImageButton";
import AddImageModal from "./components/AddImageModal";
import ImageContainer from "./components/ImageContainer";
import StoryContainer from "./components/StoryContainer";
import { useImage } from "./hooks/useImage";

export default function Home() {
  const {
    images,
    setImages,
    previewUrl,
    handleFileSelect,
    handleAddImage,
    handleClose,
    openModal,
    setOpenModal,
  } = useImage();

  return (
    <div className="flex min-h-screen font-sans bg-black">
      <main className="flex flex-col w-full gap-8 py-8 px-4 md:px-8">
        <div className="flex gap-8 w-full max-w-6xl mx-auto">
          <StoryContainer images={images} />
        </div>

        <div className="flex gap-8 w-full max-w-6xl mx-auto">
          <div className="flex-1 min-w-[60%] max-w-2xl">
            <ImageContainer images={images} setImages={setImages} />
          </div>

          <aside className="hidden md:block w-full sticky top-8 h-fit space-y-4">
            <div className="border border-border rounded-lg p-6 bg-card">
              <h2 className="text-lg font-semibold mb-4 text-foreground">
                Your Gallery
              </h2>
              <p className="text-sm text-muted-foreground mb-4">
                {images.length} {images.length === 1 ? "image" : "images"}
              </p>
              <AddImageButton setOpenPopover={setOpenModal} />
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Project Details</CardTitle>
                <CardDescription>
                  <p className="text-md font-medium text-muted-foreground mb-4">
                    This is a simple project built with Next.js, Shadcn UI, and
                    Tailwind CSS where images can be uploaded to a story and
                    displayed in an instagram/facebook lookalike layout.
                  </p>
                  <p className="text-md font-medium text-muted-foreground mb-4">
                    The images are stored in the browser&apos;s local storage in
                    an array of objects with a base64 string and a timestamp.
                  </p>
                </CardDescription>
              </CardHeader>
            </Card>
          </aside>

          <div className="md:hidden fixed bottom-6 right-6 z-50">
            <AddImageButton setOpenPopover={setOpenModal} />
          </div>
        </div>
      </main>

      <AddImageModal
        open={openModal}
        setOpen={setOpenModal}
        handleFileSelect={handleFileSelect}
        handleClose={handleClose}
        handleAddImage={handleAddImage}
        previewUrl={previewUrl}
      />
    </div>
  );
}
