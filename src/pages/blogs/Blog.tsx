import { useInfiniteQuery } from "@tanstack/react-query";
import PostCard from "@/components/posts/PostCard";
import { infinitePostQuery } from "@/api/query";
import { Button } from "@/components/ui/button";

const Blog = () => {
  const {
    status,
    data,
    error,
    isFetching,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery(infinitePostQuery());

  const allPosts = data?.pages.flatMap((page) => page.posts) ?? [];

  return status === "pending" ? (
    <p>Loading...</p>
  ) : status === "error" ? (
    <p>Error: {error.message}</p>
  ) : (
    <div className="container mx-auto">
      <h1 className="text-center text-2xl font-bold md:text-left mt-8">
        Latest Blog Posts
      </h1>
      <PostCard posts={allPosts} isHaveContent={true} />
      <div className="my-4 flex justify-center">
        <Button
          onClick={() => fetchNextPage()}
          disabled={!hasNextPage || isFetchingNextPage}
          variant={!hasNextPage ? "ghost" : "secondary"}
        >
          {isFetchingNextPage
            ? "Loading more..."
            : hasNextPage
              ? "Load More"
              : "Nothing more to load"}
        </Button>
      </div>
      <div>
        {isFetching && !isFetchingNextPage ? "Background Updating..." : null}
      </div>
    </div>
  );
};

export default Blog;
