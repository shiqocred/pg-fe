import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { auth } from "@/hooks/use-auth";
import { redirect } from "next/navigation";
import { BlogTable } from "./_components/blog-table";
import { getBlogs } from "@/actions/get-blogs";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Header } from "@/components/header";
import { mapCabang } from "@/lib/utils";
import { $Enums } from "@prisma/client";
import { formatDistanceStrict } from "date-fns";
import { id as indonesia } from "date-fns/locale";

export interface BlogsColumnsProps {
  id: string;
  title: string;
  category: string;
  author: string;
  cabang: string;
  highlight: string;
  imageUrl: string;
  date: string;
  isPublish: boolean;
  isAdmin: boolean;
}

interface BlogsProps {
  profile: {
    id: string;
    cabang: $Enums.CabangRole;
  };
  category: {
    id: string;
    name: string;
  };
  id: string;
  createdAt: Date;
  title: string;
  highlight: string;
  imageUrl: string;
  author: string;
  isPublish: boolean;
  admin: boolean;
}

const BlogsPage = async () => {
  const { userId } = await auth();

  if (!userId) return redirect("/login");

  const blog: BlogsProps[] = await getBlogs(userId);

  const formatedBlogs: BlogsColumnsProps[] = blog.map((item) => ({
    id: item.id,
    title: item.title,
    category: item.category.name,
    author: item.author,
    cabang:
      mapCabang
        .find((i) => i.value === item.profile.cabang)
        ?.label.split("-")
        .join(" ") ?? item.profile.cabang,
    highlight: item.highlight,
    imageUrl: item.imageUrl,
    date: formatDistanceStrict(
      item.createdAt.toString(),
      new Date().toString(),
      {
        addSuffix: true,
        locale: indonesia,
      }
    ),
    isPublish: item.isPublish,
    isAdmin: item.admin,
  }));

  return (
    <div className="flex flex-col gap-3 lg:gap-4 p-4 lg:p-6">
      <Header title="Blogs Page" description="Read for knowledge" />
      <div className="w-full font-avenir font-normal flex text-sm mt-1 mb-3">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/admin/dashboard">Admin</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Blog</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <BlogTable data={formatedBlogs} />
    </div>
  );
};

export default BlogsPage;
