import React from 'react'
import { useParams, Link } from 'react-router'
import { posts } from '@/data/posts'
import { Icons } from '@/components/icons';
import { Button } from '@/components/ui/button';
import type { Post } from "@/types";
import RichTextRenderer from '@/components/posts/RichTextRenderer';

const BlogDetail = () => {
    const {blogId} = useParams<{blogId: string}>()
    const post = posts.find((p) => p.id === blogId)
  return (
    <div className="container mx-auto px-4 lg:px-0">
      <section className="flex flex-col lg:flex-row">
        <section className="w-full lg:w-3/4 lg:pr-16">
          <Button variant="outline" asChild className="mb-6 mt-8">
            <Link to="/blogs">
              <Icons.arrowLeft />
              All Posts
            </Link>
          </Button>
          {post ? (
            <>
              <h2 className="mb-3 text-3xl font-extrabold">
                {post.title}
              </h2>
              <div className="text-sm">
                <span>
                  by
                  <span className="font-semibold">
                    {" "}
                    {post.author}{" "}
                  </span>
                  on
                  <span className="font-semibold">
                    {" "}
                    {post.updatedAt}
                  </span>
                </span>
              </div>
              <h3 className="my-6 text-base font-normal">
                {post.content}
              </h3>
              <img
                src={ post.image}
                alt={post.title}
                loading="lazy"
                decoding="async"
                className="w-full rounded-xl"
              />
              <RichTextRenderer
                content={post.body}
                className="my-8"
              />
              <div className="mb-12 space-x-2">
                {post.tags.map((tag: string) => (
                  <Button key={tag} variant="secondary">{tag}</Button>
                ))}
              </div>
            </>
          ) : (
            <p className="mb-16 mt-8 text-center text-xl font-bold text-muted-foreground lg:mt-24">
              No post found
            </p>
          )}
        </section>
        <section className="w-full lg:mt-24 lg:w-1/4">
          <div className="mb-8 flex items-center gap-2 text-base font-semibold">
            <Icons.layers />
            <h3 className="">Other Blog Posts</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1">
              {posts.map((post: Post) => (
              <Link
                key={post.id}
                to={`/blogs/${post.id}`}
                className="mb-6 flex items-start gap-2"
              >
                <img
                  src={post.image}
                  alt="blog post"
                  loading="lazy"
                  decoding="async"
                  className="w-1/4 rounded"
                />
                <div className="w-3/4 text-sm font-medium text-muted-foreground">
                  <p className="line-clamp-2">{post.content}</p>
                  <i>... see more</i>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </section>
    </div>  )
}

export default BlogDetail