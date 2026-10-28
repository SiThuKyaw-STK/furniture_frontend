import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Icons } from "@/components/icons";
import { useFetcher } from "react-router";

interface FavouriteProps {
  productId: string;
  rating: number;
  isFavorited: boolean;
  className?: string;
}

const AddToFavourite = ({
  productId,
  rating,
  isFavorited,
  className,
  ...props
}: FavouriteProps) => {
  const fetcher = useFetcher({ key: `favourite-${productId}` });

  let favourite = isFavorited;
  if(fetcher.formData){
    favourite = fetcher.formData.get('favourite') === "true";
  }

  return (
    <fetcher.Form method="post">
      <Button
        variant="secondary"
        size="icon"
        className={cn("size-8 shrink-0", className)}
        name="favourite"
        value={favourite ? "false" : "true"}
        {...props}
      >
        {favourite ? (
          <Icons.heartFilled className="size-4 text-red-500" />
        ) : (
          <Icons.heart className="size-4 text-red-500" />
        )}
      </Button>
    </fetcher.Form>
  );
};

export default AddToFavourite;
