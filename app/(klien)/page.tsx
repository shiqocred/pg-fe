"use client";

import { CardPondok } from "@/components/card-pondok";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { formatTanggal, mapCabang } from "@/lib/utils";
import { $Enums } from "@prisma/client";
import axios from "axios";
import { format } from "date-fns";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  PlayCircle,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperType } from "swiper/types";

interface DashboardProps {
  videos: {
    id: string;
    title: string;
    videoUrl: string;
    createdAt: string;
    thumbnailUrl: string;
    profile: {
      id: string;
      cabang: $Enums.CabangRole;
    };
    category: {
      id: string;
      name: string;
    };
  }[];
  photos: {
    id: string;
    imageUrl: string;
    profile: {
      id: string;
      cabang: $Enums.CabangRole;
    };
  }[];
  posts: {
    id: string;
    title: string;
    author: string;
    highlight: string;
    createdAt: string;
    imageUrl: string;
    profile: {
      id: string;
      cabang: $Enums.CabangRole;
    };
    category: {
      id: string;
      name: string;
    };
  }[];
  posters: {
    id: string;
    title: string;
    posterUrl: string;
    createdAt: string;
    profile: {
      id: string;
      cabang: $Enums.CabangRole;
    };
    category: {
      id: string;
      name: string;
    };
  }[];
}

const HomePage = () => {
  const [isBTSOpen, setIsBTSOpen] = useState(false);
  const [urlVideo, setUrlVideo] = useState("");
  const router = useRouter();
  const dashboardRef = useRef<SwiperType>();

  const [dashboards, setDashboard] = useState<DashboardProps>();

  const handleGetDashboards = async () => {
    try {
      const res = await axios.get("/api/dashboard");
      setDashboard(res.data.data);
    } catch (error) {
      console.log(["ERROR_GET_DASHBOARD:"], error);
    }
  };

  const handleOpenVideo = (data: string) => {
    setIsBTSOpen(!isBTSOpen);
    if (isBTSOpen) {
      setUrlVideo("");
    } else {
      setUrlVideo(data);
    }
  };

  useEffect(() => {
    if (!isBTSOpen) {
      setUrlVideo("");
    }
  }, [isBTSOpen]);

  useEffect(() => {
    handleGetDashboards();
  }, []);

  return (
    <main className="bg-[#EBF0E5] font-revans w-screen h-auto relative">
      <Navbar />
      <section className="w-full relative aspect-[16/38] -mt-16">
        <Image
          fill
          src={"/images/main/group_2.webp"}
          alt=""
          className="absolute w-full h-auto top-0 left-0 pointer-events-none"
          priority
        />
      </section>
      <section className="w-full h-[450px] relative overflow-hidden -mt-24">
        <div className="w-full flex justify-center items-center">
          <p className="font-bold text-[#7B897F] text-lg">Presented by</p>
        </div>
        <div className="w-full flex justify-center items-center mt-5 relative">
          <div className="absolute -left-[130px] -top-5 opacity-20">
            <div className="relative w-[300px] aspect-[8/11]">
              <Image
                fill
                className="pointer-events-none"
                src={"/images/main/10.webp"}
                alt=""
              />
            </div>
          </div>
          <div className="relative w-40 aspect-[8/11]">
            <Image
              fill
              className="pointer-events-none"
              src={"/images/main/10.webp"}
              alt=""
            />
          </div>
          <div className="absolute top-[250px]">
            <div className="relative w-[300px] aspect-[19/6]">
              <Image
                fill
                className="pointer-events-none"
                src={"/images/main/11.webp"}
                alt=""
              />
            </div>
          </div>
        </div>
      </section>
      {(dashboards?.videos || dashboards?.photos) && (
        <section className="flex w-full py-10 flex-col gap-2 h-full">
          <div className="w-full flex flex-col justify-center items-center mb-4">
            <p className="font-semibold text-[#7B897F] leading-none text-3xl">
              EXPLORE
            </p>
            <p className="font-semibold text-[#7B897F] leading-none text-3xl">
              BEHIND THE SCENE
            </p>
          </div>
          {dashboards.videos.length > 0 && (
            <div className="flex flex-col gap-2">
              <div className="grid w-full p-3 grid-cols-2 gap-2 h-full">
                <Dialog open={isBTSOpen} onOpenChange={setIsBTSOpen}>
                  <DialogContent className="p-2">
                    <iframe
                      src={`https://www.youtube.com/embed/${urlVideo}?vq=hd1080&modestbranding=1&rel=0&hl=id-ID`}
                      className="w-full aspect-video rounded-md"
                      title={"fgh"}
                      allowFullScreen
                    />
                  </DialogContent>
                </Dialog>

                {dashboards.videos.map((item) => (
                  <Button
                    key={item.id}
                    onClick={() => handleOpenVideo(item.videoUrl)}
                    className="first:col-span-2 bg-transparent p-0 hover:bg-transparent w-full flex h-full group"
                  >
                    <Card className="w-full gap-2 flex flex-col overflow-hidden rounded-md shadow-sm bg-transparent">
                      <div className="w-full relatif object-cover group-first:aspect-video aspect-[7/5] relative  rounded-md overflow-hidden shadow-md">
                        <div className="w-full h-full absolute top-0 left-0 bg-white/20 backdrop-blur-sm z-20 group-hover:flex items-center justify-center hidden">
                          <PlayCircle className="w-12 h-12 stroke-[1.5]" />
                        </div>
                        <div className="pb-2 pt-4 overflow-hidden bg-gradient-to-b from-black/0 to-black/80 absolute bottom-0 z-10 w-full text-white text-start font-avenir font-semibold flex px-2 gap-1">
                          <h5 className="text-xs capitalize leading-tight line-clamp-2  overflow-hidden">
                            {item.title}
                          </h5>
                        </div>
                        <Badge className="capitalize absolute z-10 top-2 right-2 font-avenir rounded font-normal text-xs px-2">
                          {mapCabang
                            .find((i) => i.value === item.profile.cabang)
                            ?.label.split("-")
                            .join(" ")}
                        </Badge>
                        <Image
                          className="object-cover pointer-events-none"
                          src={item.thumbnailUrl}
                          alt={item.title}
                          fill
                        />
                      </div>
                    </Card>
                  </Button>
                ))}
              </div>
              <div className="flex items-center justify-center mb-5">
                <Button
                  onClick={() => router.push(`/bts-videos`)}
                  className="bg-transparent hover:bg-transparent rounded-full border text-black h-8 text-xs border-[#7B897F]"
                >
                  View More Videos
                </Button>
              </div>
            </div>
          )}
          {dashboards.photos && (
            <div className="flex flex-col gap-2">
              <div className="grid w-full p-3 grid-cols-3 gap-2 h-full">
                {dashboards.photos.map((item) => (
                  <Button
                    key={item.id}
                    className="col-span-1 bg-transparent p-0 hover:bg-transparent w-full flex h-full group"
                  >
                    <Card className="w-full gap-2 flex flex-col overflow-hidden rounded-md shadow-sm bg-transparent">
                      <div className="w-full relatif object-cover aspect-square relative  rounded-md overflow-hidden">
                        <Image
                          className="object-cover pointer-events-none"
                          src={item.imageUrl}
                          alt={item.profile.cabang}
                          fill
                        />
                      </div>
                    </Card>
                  </Button>
                ))}
              </div>
              <div className="flex items-center justify-center">
                <Button
                  onClick={() => router.push(`/bts-images`)}
                  className="bg-transparent hover:bg-transparent rounded-full border text-black h-8 text-xs border-[#7B897F]"
                >
                  View More Photos
                </Button>
              </div>
            </div>
          )}
        </section>
      )}
      {dashboards?.posts && dashboards.posts.length > 0 && (
        <section className="flex w-full py-10 px-3 flex-col gap-2 h-full">
          <div className="w-full flex flex-col justify-center items-center mb-4">
            <p className="font-semibold text-[#7B897F] leading-none text-3xl">
              EXPLORE
            </p>
            <p className="font-semibold text-[#7B897F] leading-none text-3xl">
              NEWS UPDATE
            </p>
          </div>
          <div className="flex flex-col gap-2">
            {dashboards.posts.map((item) => (
              <Card
                key={item.id}
                className="bg-transparent flex items-center font-avenir w-full justify-between shadow-none border-t-0 border-l-0 border-r-0 border-[#7B897F] rounded-none px-2 py-1"
              >
                <div className="flex-1 flex flex-col gap-2">
                  <div className="flex items-center text-xs capitalize">
                    <p>
                      {item.author} | {formatTanggal(item.createdAt)}
                    </p>
                  </div>
                  <div className="font-semibold w-full capitalize">
                    {item.title}
                  </div>
                </div>
                <div className="w-6 flex flex-none">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </Card>
            ))}
          </div>
          <div className="flex items-center justify-center mt-3">
            <Button
              onClick={() => router.push(`/blogs`)}
              className="bg-transparent hover:bg-transparent rounded-full border text-black h-8 text-xs border-[#7B897F]"
            >
              View More News
            </Button>
          </div>
        </section>
      )}
      {dashboards?.posters && dashboards.posters.length > 0 && (
        <section className="flex w-full py-10 px-3 flex-col gap-2 h-full">
          <div className="w-full flex flex-col justify-center items-center mb-4">
            <p className="font-semibold text-[#7B897F] leading-none text-3xl">
              EXPLORE
            </p>
            <p className="font-semibold text-[#7B897F] leading-none text-3xl">
              POSTERS
            </p>
          </div>
          <Swiper
            modules={[Autoplay]}
            spaceBetween={8}
            centeredSlides={true}
            slidesPerView={"auto"}
            loop={true}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            onSwiper={(swiper) => {
              dashboardRef.current = swiper;
            }}
            className="mySwiper"
            id="poster"
          >
            <div className="flex justify-between mt-2">
              <div className="flex gap-2">
                <Button
                  className="w-8 h-8 p-0"
                  disabled={dashboards.posters.length === 1}
                  onClick={() => dashboardRef.current?.slidePrev()}
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <Button
                  className="w-8 h-8 p-0"
                  disabled={dashboards.posters.length === 1}
                  onClick={() => dashboardRef.current?.slideNext()}
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
              <Button
                onClick={() => router.push(`/posters`)}
                className="bg-transparent hover:bg-transparent rounded-full border text-black h-8 text-xs border-[#7B897F]"
              >
                View More Posters
              </Button>
            </div>
            {dashboards.posters.map((item) => (
              <SwiperSlide key={item.id} className="h-full">
                <Link href="#" className="w-full h-full">
                  <Card className="flex items-center w-full justify-center shadow-none relative flex-col h-full bg-transparent">
                    <div className="relative w-full aspect-[70/99] rounded-md overflow-hidden">
                      <div className="pb-2 pt-4 overflow-hidden bg-gradient-to-b from-black/0 to-black/80 absolute bottom-0 z-10 w-full text-white text-start font-avenir font-semibold flex px-2 gap-1">
                        <h5 className="text-xs capitalize leading-tight line-clamp-2  overflow-hidden">
                          {item.title}
                        </h5>
                      </div>
                      <Badge className="capitalize absolute z-10 top-2 right-2 font-avenir rounded font-normal text-xs px-2">
                        {mapCabang
                          .find((i) => i.value === item.profile.cabang)
                          ?.label.split("-")
                          .join(" ")}
                      </Badge>
                      <Image
                        src={item.posterUrl}
                        alt={item.title}
                        fill
                        className="object-cover pointer-events-none"
                      />
                    </div>
                  </Card>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </section>
      )}
      <section className="w-screen relative overflow-x-hidden pt-10">
        <div className="w-full flex flex-col justify-center items-center mb-4">
          <p className="font-semibold text-[#7B897F] leading-none text-3xl">
            EXPLORE
          </p>
          <p className="font-semibold text-[#7B897F] leading-none text-3xl">
            MORE
          </p>
        </div>
        <div className="w-full px-3 gap-3 grid grid-cols-2">
          <CardPondok
            href="/kampus-pusat"
            image="/images/main/gontor1.webp"
            location="Gontor, Ponorogo, Jawa Timur"
            title="Kampus Putra Pusat"
          />
          <CardPondok
            href="/kampus-3"
            image="/images/main/gontor3.webp"
            location="Kediri, Jawa Timur"
            title="Kampus Putra 3 - DarulMa'rifat"
          />
          <CardPondok
            href="/kampus-4"
            image="/images/main/gontor4.webp"
            location="Banyuwangi, Jawa Timur"
            title="Kampus Putra 4 - Darul Muttaqien"
          />
          <CardPondok
            href="/kampus-5"
            image="/images/main/gontor5.webp"
            location="Magelang, Jawa Tengah"
            title="Kampus Putra 5 - Darul Qiyam"
          />
          <CardPondok
            href="/kampus-6"
            image="/images/main/gontor6.webp"
            location="Konawe Selatan, Sulawesi Tenggara"
            title="Kampus Putra 6 - Riyadhatul Mujahidin"
          />
          <CardPondok
            href="/kampus-7"
            image="/images/main/gontor7.webp"
            location="Kalianda, Lampung"
            title="Kampus Putra 7"
          />
          <CardPondok
            href="/kampus-putri-1"
            image="/images/main/gontorGp1.webp"
            location="Ngawi, Jawa Timur"
            title="Kampus Putri 1"
          />
          <CardPondok
            href="/kampus-putri-3"
            image="/images/main/gontorGp3.webp"
            location="Ngawi, Jawa Timur"
            title="Kampus Putri 3"
          />
          <CardPondok
            href="/kampus-putri-4"
            image="/images/main/gontorGp4.webp"
            location="Kediri, Jawa Timur"
            title="Kampus Putri 4"
          />
          <CardPondok
            href="/kampus-putri-7"
            image="/images/main/gontorGp7.webp"
            location="Kampar, Riau"
            title="Kampus Putri 7"
          />
        </div>
      </section>
      <Footer />
    </main>
  );
};

export default HomePage;
