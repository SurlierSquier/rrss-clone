import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface AddImageButtonProps {
  setOpenPopover: (open: boolean) => void;
}

export default function AddImageButton({
  setOpenPopover,
}: AddImageButtonProps) {
  return (
    <Button
      className="w-full cursor-pointer"
      onClick={() => setOpenPopover(true)}
    >
      <Plus className="h-4 w-4 mr-2" />
      Add Image
    </Button>
  );
}
