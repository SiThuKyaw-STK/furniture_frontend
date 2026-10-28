import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Icons } from "@/components/icons";
import { useMutation } from "@tanstack/react-query";
import api from "@/api";
import { queryClient } from "@/api/query";
import { useIsFetching } from "@tanstack/react-query";

interface FavouriteProps {
  productId: number;
  rating: number;
  isFavorited: boolean;
  className?: string;
}

const AddToFavouriteTanstack = ({
  productId,
  rating,
  isFavorited,
  className,
  ...props
}: FavouriteProps) => {
  const isFetching = useIsFetching();
  console.log("isFetching", isFetching);
  let favourite = isFavorited;

  const {mutate, isPending} = useMutation({
    mutationFn: async () => {
      const data = {
        productId,
        favourite: !isFavorited,
      };

      try {
        await api.patch("users/products/toggle-favourite", data);
      } catch (error) {
        console.log(error);
      }
    },
    onSuccess: () => {},
    onError: () => {},
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["products","detail",productId]
      })
    },
  });

  if(isPending || isFetching){
    favourite = !isFavorited;
  }

  return (
      <Button
        variant="secondary"
        size="icon"
        className={cn("size-8 shrink-0", className)}
        onClick={() => mutate()}
        {...props}
      >
        {favourite ? (
          <Icons.heartFilled className="size-4 text-red-500" />
        ) : (
          <Icons.heart className="size-4 text-red-500" />
        )}
      </Button>
  );
};

export default AddToFavouriteTanstack;
