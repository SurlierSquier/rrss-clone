import { ImageData } from "../hooks/useImage";
import StoryItem from "./StoryItem";

interface StoryContainerProps {
  images: ImageData[];
}

export default function StoryContainer({ images }: StoryContainerProps) {
  return (
    <div className="flex flex-row gap-6 w-full">
      <div className="w-full h-auto border border-border bg-card rounded-2xl flex flex-row ">
        {images.map((image) => (
          <StoryItem key={image.id} image={image} />
        ))}
      </div>
    </div>
  );
}
