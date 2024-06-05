"use client";

import { Navbar } from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { ArrowLeft, PlayCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import axios from "axios";
import { Footer } from "@/components/footer";

interface VideosProps {
  id: string;
  title: string;
  category: string;
  videoUrl: string;
  thumbnailUrl: string;
  cabang: string;
  date: string;
}

const BTSVideosPage = () => {
  const [isBTSOpen, setIsBTSOpen] = useState(false);
  const [totalPage, setTotalPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [videos, setVideos] = useState<VideosProps[]>();

  const handleGetData = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get(`/api/videos?p=${page}`);
      const data = res.data.data.data;
      setVideos(data);
      setTotalPage(res.data.data.last_page);
    } catch (error) {
      console.log(["ERROR_GET_VIDEOS:"], error);
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
      <section className="w-full h-full object-cover overflow-hidden relative px-4 pt-5 font-avenir font-normal text-justify gap-4 flex flex-col pb-10">
        <div className="flex items-center">
          <Link href={`/`} className="mr-2">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="uppercase text-lg font-revans leading-none">
              BEHIND THE SCENE
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
                <BreadcrumbPage>BTS Videos</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <Dialog open={isBTSOpen} onOpenChange={setIsBTSOpen}>
          <DialogContent className="p-2">
            <iframe
              src={`https://www.youtube.com/embed/QwbK1GUWN30?vq=hd1080&modestbranding=1&rel=0&hl=id-ID`}
              className="w-full aspect-video rounded-md"
              title={"fgh"}
            />
          </DialogContent>
        </Dialog>
        <div className="w-full flex flex-col">
          {videos?.map((item) => (
            <button
              key={item.id}
              onClick={() => setIsBTSOpen(true)}
              className="group hover:bg-white/20 px-2 py-4 hover:shadow border-b last:border-none border-gray-500"
            >
              <Card className="w-full gap-2 flex flex-col bg-transparent shadow-none border-none items-start text-start">
                <div className="w-full object-cover aspect-video relative rounded-md overflow-hidden shadow-md">
                  <div className="w-full h-full absolute top-0 left-0 bg-white/20 backdrop-blur-sm z-10 group-hover:flex items-center justify-center hidden">
                    <PlayCircle className="w-12 h-12 stroke-[1.5]" />
                  </div>
                  <Image
                    className="object-cover pointer-events-none"
                    src={item.thumbnailUrl}
                    alt=""
                    fill
                  />
                </div>
                <div className="flex capitalize text-xs text-gray-700 justify-between items-center w-full">
                  <p>{item.cabang}</p>
                  <p>{item.date}</p>
                </div>
                <h3 className="font-bold group-hover:underline capitalize line-clamp-2">
                  {item.title}
                </h3>
              </Card>
            </button>
          ))}
          {(!videos || videos.length === 0) && (
            <div>Oops, Nothing Blog Listed.</div>
          )}
        </div>
      </section>
      <Footer />
    </main>
  );
};

export default BTSVideosPage;
