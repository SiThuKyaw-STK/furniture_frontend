import { posts } from "@/data/posts";
import PostCard from "@/components/posts/PostCard";

const Blog = () => {
  return (
    <div className="container mx-auto">
      <h1 className="text-center text-2xl font-bold md:text-left mt-8">
        Latest Blog Posts
      </h1>
      <PostCard posts={posts} isHaveContent={true} />
      {/* <div className="my-4 flex justify-center">
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
      </div> */}
      {/* <div>
        {isFetching && !isFetchingNextPage ? "Background Updating..." : null}
      </div> */}
    </div>
  );
};

export default Blog;
