"use client";

import { HeartIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import useToast from "@/components/use-toast";

interface ToggleFavouriteButtonProps {
  productId: string;
  isFavourite: boolean;
  onFavouriteToggle: (isFavourite: boolean) => void;
}

export default function ToggleFavouriteButton({
  productId,
  isFavourite,
  onFavouriteToggle,
}: ToggleFavouriteButtonProps) {
  const { toast } = useToast();
  const router = useRouter();

  const handleToggleFavourite = async () => {
    try {
      onFavouriteToggle(!isFavourite); // Optimistic UI update

      const response = await fetch(
        `/api/favourites/${isFavourite ? "remove" : "add"}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ productId }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update favourites");
      }

      toast({
        title: "Success",
        description: `Product ${
          isFavourite ? "removed from" : "added to"
        } favourites.`,
        status: "success",
      });

      router.refresh(); // Optional: to revalidate server data
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update favourites. Please try again.",
        status: "error",
      });

      // Revert the optimistic UI update if the request fails
      onFavouriteToggle(isFavourite);
    }
  };

  return (
    <button
      className="cursor-pointer"
      onClick={handleToggleFavourite}
    >
      <HeartIcon
        className="text-[#db2777] hover:text-lightText duration-300"
        fill={isFavourite ? "#db2777" : "white"}
      />
    </button>
  );
}
