import { Skeleton } from "@/components/ui/skeleton";
import { ImageData } from "../hooks/useImage";
import StoryItem from "./StoryItem";

interface StoryContainerProps {
  images: ImageData[];
}

export default function StoryContainer({ images }: StoryContainerProps) {
  return (
    <div className="flex flex-row gap-6 w-full">
      <div className="w-full h-auto border border-border bg-card rounded-2xl flex flex-row overflow-x-auto no-scrollbar">
        {images.length === 0 && (
          <>
            {[...Array(15)].map((_, index) => (
              <Skeleton
                key={index}
                className="w-16 h-16 rounded-full min-w-16 min-h-16 m-2 animate-pulse"
              />
            ))}
          </>
        )}
        {images.map((image) => (
          <StoryItem key={image.id} image={image} />
        ))}
      </div>
    </div>
  );
}
