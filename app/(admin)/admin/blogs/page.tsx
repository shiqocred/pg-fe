import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { BlogsColumnsProps } from "./_components/columns";
import { auth } from "@/hooks/use-auth";
import { redirect } from "next/navigation";
import { BlogTable } from "./_components/blog-table";
import { getBlogs } from "@/actions/get-blogs";

const BlogsPage = async () => {
  const { userId } = await auth();

  if (!userId) return redirect("/login");

  const blog = await getBlogs();

  const formatedBlogs: BlogsColumnsProps[] = blog.map((item) => ({
    id: item.id,
    title: item.title,
    category: item.category.name,
    author: item.author,
    cabang: item.profile.cabang,
    highlight: item.highlight,
    isOwner: item.profile.id === userId,
    isPublish: item.isPublish,
  }));

  return (
    <div className="flex flex-col gap-y-4 p-6">
      Blogs Page
      <Link href="/admin/blogs/create">
        <Button>Create</Button>
      </Link>
      <BlogTable data={formatedBlogs} />
      {/* <iframe
        src="https://www.youtube.com/embed/VuHqYB-hH7k?vq=hd1080&modestbranding=1&rel=0&hl=id-ID"
        className="w-[500px] aspect-video rounded-md"
        allowFullScreen
      /> */}
    </div>
  );
};

export default BlogsPage;
