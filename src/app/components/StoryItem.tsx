import Image from "next/image";
import { ImageData } from "../hooks/useImage";

interface StoryItemProps {
  image: ImageData;
}

export default function StoryItem({ image }: StoryItemProps) {
  const handleOpenImageModal = (id: string) => {
    console.log(id);
  };

  return (
    <>
      <div
        className="min-w-16 min-h-16 rounded-full border border-black bg-card relative m-2 cursor-pointer"
        onClick={() => handleOpenImageModal(image.id)}
      >
        <Image
          src={image.base64}
          alt="Story"
          fill
          className="rounded-full object-cover object-center blur-[2px]"
        />
      </div>
    </>
  );
}
