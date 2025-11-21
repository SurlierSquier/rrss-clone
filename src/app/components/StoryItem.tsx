import Image from "next/image";
import { ImageData } from "../hooks/useImage";

interface StoryItemProps {
  image: ImageData;
}

export default function StoryItem({ image }: StoryItemProps) {
  return (
    <>
      <div className="w-16 h-16 rounded-full border border-black bg-card relative m-2">
        <Image
          src={image.base64}
          alt="Story"
          fill
          className="rounded-full object-cover object-center"
        />
      </div>
    </>
  );
}
