"use client";

import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import axios from "axios";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

interface BlogsProps {
  id: string;
  title: string;
  category: string;
  author: string;
  cabang: string;
  highlight: string;
  imageUrl: string;
  date: string;
}

const BlogsPage = () => {
  const [totalPage, setTotalPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [blogs, setBlogs] = useState<BlogsProps[]>();

  const handleGetData = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get(`/api/blogs?p=${page}`);
      const data = res.data.data.data;
      setBlogs(data);
      setTotalPage(res.data.data.last_page);
    } catch (error) {
      console.log(["ERROR_GET_BLOGS:"], error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    handleGetData();
  }, []);
  return (
    <main className="bg-[#EBF0E5] font-revans w-screen min-h-screen h-auto relative">
      <Navbar />
      <section className="w-full h-full object-cover overflow-hidden relative px-4 pt-5 font-avenir font-normal gap-4 flex flex-col pb-10">
        <div className="flex items-center">
          <Link href={`/`} className="mr-2">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="uppercase text-lg font-revans leading-none">
              NEWS UPDATE
            </h1>
          </div>
        </div>
        <div className="w-full font-avenir font-normal flex text-sm">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Blog</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        {blogs && blogs.length > 0 && (
          <Link
            href={`/blogs/${blogs[0].id}`}
            className="gap-3 flex flex-col group"
          >
            <div className="relative aspect-video w-full rounded-md overflow-hidden shadow-md">
              <Image
                src={blogs[0].imageUrl}
                alt={blogs[0].title}
                fill
                className="object-cover pointer-events-none"
              />
            </div>
            <div className="flex text-xs leading-none text-gray-500 capitalize">
              <p>
                {blogs[0].author} | {blogs[0].date}
              </p>
            </div>
            <h3 className="text-lg font-bold group-hover:underline leading-tight">
              {blogs[0].title}
            </h3>
            <p className="text-sm text-justify">{blogs[0].highlight}</p>
          </Link>
        )}
        {blogs && blogs?.length > 1 && <Separator className={"bg-gray-400"} />}
        {blogs?.slice(1, blogs.length).map((item) => (
          <>
            <Link
              href={`/blogs/${item.id}`}
              className="gap-3 flex flex-col group"
              key={item.id}
            >
              <div className="flex text-xs leading-none text-gray-500 capitalize">
                <p>
                  {item.author} | {item.date}
                </p>
              </div>
              <h3 className="text-lg font-bold group-hover:underline leading-tight">
                {item.title}
              </h3>
              <p className="text-sm text-justify">{item.highlight}</p>
            </Link>
            <Separator className={"bg-gray-400 last:hidden"} />
          </>
        ))}
        {(!blogs || blogs.length === 0) && (
          <div>Oops, Nothing Blog Listed.</div>
        )}
      </section>
      <Footer />
    </main>
  );
};

export default BlogsPage;
