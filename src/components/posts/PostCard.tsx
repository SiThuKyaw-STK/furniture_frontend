import type { Post } from "@/types";
import { Link } from "react-router";

interface PostCardProps {
  posts: Post[];
  isHaveContent: boolean;
}
const PostCard = ({ posts, isHaveContent = false }: PostCardProps) => {
  return (
    <div className="grid grid-cols-1 gap-8 px-4 md:grid-cols-2 md:px-0 lg:grid-cols-3 my-8">
      {posts.map((post) => (
        <Link to={`/blogs/${post.id}`} key={post.id} className="">
          <img
            src={post.image}
            alt="blog-post"
            className="mb-4 w-full rounded-2xl object-cover"
          />
          <h2 className={`${!isHaveContent && 'ml-4'} line-clamp-1 text-xl font-extrabold`}>
            {post.title}
          </h2>
          {isHaveContent && (
            <h3 className={`${!isHaveContent && 'ml-4'} my-2 text-sm text-muted-foreground line-clamp-2`}>
              {post.content}
            </h3>
          )}
          <div className={`${!isHaveContent && 'ml-4'} mt-2 text-xs space-x-1`}>
            <span>
              by<span className="font-semibold"> {post.author} </span>
              on
              <span className="font-semibold"> {post.updatedAt}</span>
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default PostCard;
