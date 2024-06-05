"use client";

import { Navbar } from "@/components/navbar";
import { ParallaxScroll } from "@/components/parallax-scroll";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import Image from "next/image";
import { mapCabang } from "@/lib/utils";
import { Footer } from "@/components/footer";

interface PhotosProps {
  id: string;
  imageUrl: string | null;
  cabang: string;
}

const BTSImagesPage = () => {
  const [photos, setPhotos] = useState<PhotosProps[]>();
  const [isLoading, setIsLoading] = useState(false);
  const [isBTSOpen, setIsBTSOpen] = useState(false);
  const [urlPhoto, setUrlPhoto] = useState("");
  const { gontorId } = useParams();

  const handleOpen = (data: string) => {
    setUrlPhoto(data);
    setIsBTSOpen(true);
  };

  const handleGetData = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get(`/api/${gontorId}/photos`);
      const data = res.data.data;
      console.log(data);
      setPhotos(data);
    } catch (error) {
      console.log(["ERROR_GET_PHOTOS:"], error);
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
          <Link href={`/${gontorId}`} className="mr-2">
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
                <BreadcrumbLink href={`/${gontorId}`}>
                  {mapCabang.find((item) => item.label === gontorId)?.kampus}
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>BTS Photos</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <Dialog open={isBTSOpen} onOpenChange={setIsBTSOpen}>
          <DialogContent className="p-2">
            <div className="w-full relatif object-cover aspect-square relative  rounded-md overflow-hidden">
              <Image
                className="object-cover pointer-events-none"
                src={urlPhoto}
                alt=""
                fill
              />
            </div>
          </DialogContent>
        </Dialog>
        <ParallaxScroll images={photos} setUrl={handleOpen} />
      </section>
      <Footer />
    </main>
  );
};

export default BTSImagesPage;
