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
import { mapCabang } from "@/lib/utils";
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
  cabang: string;
  posterUrl: string;
  date: string;
}

const BlogsPage = () => {
  const [totalPage, setTotalPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [posters, setPosters] = useState<BlogsProps[]>();
  const { gontorId } = useParams();

  const handleGetData = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get(`/api/${gontorId}/posters?p=${page}`);
      const data = res.data.data.data;
      setPosters(data);
      setTotalPage(res.data.data.last_page);
    } catch (error) {
      console.log(["ERROR_GET_POSTERS:"], error);
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
          <Link href={`/${gontorId}`} className="mr-2">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="uppercase text-lg font-revans leading-none">
              Posters
            </h1>
          </div>
        </div>
        <div className="w-full font-avenir font-normal flex text-sm">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href={`/${gontorId}`}>
                  {mapCabang.find((item) => item.label === gontorId)?.kampus}
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Posters</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        {posters?.map((item) => (
          <>
            <Link
              href={`/posters/${item.id}`}
              className="gap-3 flex flex-col group"
              key={item.id}
            >
              <div className="relative aspect-[70/99] w-full rounded-md overflow-hidden shadow-md">
                <Image
                  src={item.posterUrl}
                  alt={item.title}
                  fill
                  className="object-cover pointer-events-none"
                />
              </div>
              <div className="flex text-xs leading-none text-gray-500 capitalize justify-between items-center">
                <p>{item.cabang}</p>
                <p>{item.date}</p>
              </div>
              <h3 className="text-lg font-bold group-hover:underline leading-tight">
                {item.title}
              </h3>
            </Link>
            <Separator className={"bg-gray-400 last:hidden"} />
          </>
        ))}
        {(!posters || posters.length === 0) && (
          <div>Oops, Nothing Poster Listed.</div>
        )}
      </section>
      <Footer />
    </main>
  );
};

export default BlogsPage;
