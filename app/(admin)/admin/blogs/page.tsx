import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { BlogsColumnsProps } from "./_components/columns";
import { auth } from "@/hooks/use-auth";
import { redirect } from "next/navigation";
import { CategoryTable } from "./_components/category-table";
import { getBlogs } from "@/actions/get-blogs";

const BlogsPage = async () => {
  const { userId } = await auth();

  if (!userId) return redirect("/login");

  const categories = await getBlogs();

  const formatedCategories: BlogsColumnsProps[] = categories.map((item) => ({
    id: item.id,
    title: item.title,
    category: item.category.name,
    author: item.author,
    cabang: item.branch.cabang,
    highlight: item.highlight,
    isOwner: item.profile.id === userId,
    isPublish: false,
  }));

  return (
    <div className="flex flex-col gap-y-4 p-6">
      Categories Page
      <Link href="/admin/blogs/create">
        <Button>Create</Button>
      </Link>
      <CategoryTable data={formatedCategories} />
    </div>
  );
};

export default BlogsPage;
