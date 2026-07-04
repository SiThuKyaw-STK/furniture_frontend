import type { Post } from "@/types";
import { Link } from "react-router";

interface PostCardProps {
  posts: Post[];
}
const PostCard = ({ posts }: PostCardProps) => {
  return (
    <div className="grid grid-cols-1 gap-8 px-4 md:grid-cols-2 md:px-0 lg:grid-cols-3">
      {posts.map((post) => (
        <Link to={`/blogs/${post.id}`} key={post.id} className="">
          <img
            src={post.image}
            alt="blog-post"
            className="mb-4 w-full rounded-2xl object-cover"
          />
          <h3 className="lime-clamp-1 ml-4 font-semibold">{post.title}</h3>
          <div className="ml-4 mt-2 text-sm space-x-1">
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
