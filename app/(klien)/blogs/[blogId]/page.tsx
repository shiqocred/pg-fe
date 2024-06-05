"use client";

import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import Preview from "@/components/preview";
import { Badge } from "@/components/ui/badge";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { mapCabang } from "@/lib/utils";
import axios from "axios";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

interface BlogsProps {
  id: string | undefined;
  title: string | undefined;
  category: string | undefined;
  author: string | undefined;
  article: string | undefined;
  cabang: string | undefined;
  imageUrl: string | undefined;
  date: string;
}

interface SugestedProps {
  id: string;
  title: string;
  category: string;
  author: string;
  cabang: string;
  highlight: string;
  imageUrl: string;
  date: string;
}

const BlogIdPage = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [blog, setBlog] = useState<BlogsProps>();
  const [sugested, setSugested] = useState<SugestedProps[]>();
  const { blogId } = useParams();

  const handleGetData = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get(`/api/blogs/${blogId}`);
      const data = res.data.data;
      setBlog(data);
      setSugested(res.data.sugested_blog);
    } catch (error) {
      console.log(["ERROR_GET_POSTERS:"], error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setIsMounted(true);
    setIsLoading(true);
    handleGetData();
  }, []);

  if (!isMounted) {
    return;
  }
  return (
    <main className="bg-[#EBF0E5] font-revans w-screen min-h-screen h-auto relative">
      <Navbar />
      <section className="w-full h-full object-cover overflow-hidden relative pt-5 font-avenir font-normal gap-4 flex flex-col pb-10">
        <div className="w-full font-avenir font-normal flex text-sm px-4">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href={`/`}>Beranda</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href={`/blogs`}>Blogs</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{blog?.title}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        {isLoading ? (
          <div className="w-full relative aspect-video shadow-md">
            <Skeleton className="w-full h-full" />
          </div>
        ) : (
          <div className="w-full relative aspect-video shadow-md">
            <Image
              src={blog?.imageUrl ?? ""}
              alt=""
              fill
              className="object-cover pointer-events-none"
            />
          </div>
        )}
        <div className="px-5 flex flex-col gap-2 relative">
          {isLoading ? (
            <div className="flex flex-col items-center gap-3 font-avenir">
              <div>
                <Skeleton className="h-6 w-36" />
              </div>
              <Skeleton className="h-7 w-full" />
              <div className="flex flex-col items-center text-sm px-[15px] capitalize text-[#7B897F] font-semibold w-full gap-1">
                <Skeleton className="h-5 w-1/2" />
                <Skeleton className="h-5 w-1/4" />
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-3 font-avenir w-full">
              <div>
                <Badge className="bg-transparent border hover:bg-transparent rounded border-[#7B897F] text-[#7B897F] capitalize">
                  {blog?.cabang}
                </Badge>
              </div>
              <h3 className="text-xl font-bold font-revans capitalize">
                {blog?.title}
              </h3>
              <div className="flex flex-col items-center text-sm px-[15px] capitalize text-[#7B897F] font-semibold">
                <p className="text-[#C6D1C0] flex items-center gap-1">
                  Penulis oleh
                  <span className="text-[#7B897F] capitalize">
                    {blog?.author}
                  </span>
                </p>
                <p>{blog?.date}</p>
              </div>
            </div>
          )}
          {isLoading ? (
            <div className="flex flex-col gap-2 w-full h-[200px] mt-5">
              <Skeleton className="h-5 w-full" />
              <Skeleton className="h-5 w-5/6" />
              <Skeleton className="h-5 w-4/6" />
              <Skeleton className="h-5 w-3/6" />
            </div>
          ) : (
            <div className="">
              <Preview value={blog?.article ?? ""} />
            </div>
          )}
        </div>
        {isLoading ? (
          <div className="flex flex-col px-4 gap-2 w-full">
            <Skeleton className="w-40 h-6" />
            <Skeleton className="w-full h-[137px]" />
            <Skeleton className="w-full h-[137px]" />
          </div>
        ) : (
          <div className="flex flex-col px-4 gap-2">
            <h5 className="font-revans">Sugested News</h5>
            {sugested?.map((item) => (
              <Link href={`/blogs/${item.id}`} key={item.id}>
                <Card className="bg-transparent shadow-none border border-gray-500 p-2 flex w-full gap-4 group">
                  <div className="w-1/3 aspect-square relative rounded overflow-hidden shadow border">
                    <Image
                      src={item.imageUrl}
                      alt={item.title}
                      fill
                      className="pointer-events-none object-cover"
                    />
                  </div>
                  <div className="w-2/3 flex flex-col gap-2">
                    <div>
                      <Badge className="bg-transparent border hover:bg-transparent rounded border-[#7B897F] text-[#7B897F] capitalize">
                        {item?.cabang}
                      </Badge>
                    </div>
                    <h3 className="font-bold font-revans capitalize group-hover:underline">
                      {item.title}
                    </h3>
                    <p className="line-clamp-3 text-sm">{item.highlight}</p>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </section>
      <Footer />
    </main>
  );
};

export default BlogIdPage;
