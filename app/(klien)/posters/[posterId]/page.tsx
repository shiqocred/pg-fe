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
import { Skeleton } from "@/components/ui/skeleton";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

interface PostersProps {
  id: string | undefined;
  title: string | undefined;
  category: string | undefined;
  cabang: string | undefined;
  posterUrl: string | undefined;
  date: string | undefined;
}

interface SugestedProps {
  id: string;
  title: string;
  category: string;
  cabang: string;
  posterUrl: string;
  date: string;
}

const PosterIdPage = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [poster, setPoster] = useState<PostersProps>();
  const [sugested, setSugested] = useState<SugestedProps[]>();
  const { posterId } = useParams();

  const handleGetData = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get(`/api/posters/${posterId}`);
      const data = res.data.data;
      setPoster(data);
      setSugested(res.data.sugested_poster);
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
  }, [posterId]);

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
                <BreadcrumbLink href={`/posters`}>Posters</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{poster?.title}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        {isLoading ? (
          <div className="w-full relative aspect-[70/99]">
            <Skeleton className="w-full h-full" />
          </div>
        ) : (
          <div className="w-full relative aspect-[70/99]">
            <Image
              src={poster?.posterUrl ?? ""}
              alt=""
              fill
              className="object-contain pointer-events-none"
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
                <Skeleton className="h-5 w-1/4" />
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-3 font-avenir w-full">
              <div>
                <Badge className="bg-transparent border hover:bg-transparent rounded border-[#7B897F] text-[#7B897F] capitalize">
                  {poster?.cabang}
                </Badge>
              </div>
              <h3 className="text-xl font-bold font-revans capitalize">
                {poster?.title}
              </h3>
              <div className="flex flex-col items-center text-sm px-[15px] capitalize text-[#7B897F] font-semibold">
                <p>{poster?.date}</p>
              </div>
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
              <Link href={`/posters/${item.id}`} key={item.id}>
                <Card className="bg-transparent shadow-none border border-gray-500 p-2 flex w-full gap-4 group">
                  <div className="w-1/3 aspect-square relative rounded overflow-hidden shadow border">
                    <Image
                      src={item.posterUrl}
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

export default PosterIdPage;
