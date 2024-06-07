"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Globe,
  PlayCircle,
  ShieldCheck,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { Swiper as SwiperType } from "swiper/types";
import { useParams, useRouter } from "next/navigation";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { cn, formatTanggal, mapCabang } from "@/lib/utils";
import axios from "axios";
import { $Enums } from "@prisma/client";
import { format, parse } from "date-fns";
import { id } from "date-fns/locale";

interface SupervisorsProps {
  id: string;
  name: string;
  imageUrl: string;
  position: $Enums.PositionSupervisor;
  createdAt: Date;
  profile: {
    id: string;
    cabang: $Enums.CabangRole;
  };
}

interface SponsorshipsProps {
  id: string;
  name: string;
  imageUrl: string;
  position: $Enums.SponsorEnum;
  createdAt: Date;
  href: string;
  profile: {
    id: string;
    cabang: $Enums.CabangRole;
  };
}

interface ParamsProps {
  supervisors: {
    chiefs: SupervisorsProps[];
    staff: SupervisorsProps[];
  };
  sponsorships: {
    utama: SponsorshipsProps[];
    tunggal: SponsorshipsProps[];
    pendamping_1: SponsorshipsProps[];
    pendamping_2: SponsorshipsProps[];
    pendamping_3: SponsorshipsProps[];
  };
  faqs: {
    id: string;
    question: string;
    answer: string;
    position: number;
  }[];
  roundowns: {
    id: string;
    title: string;
    imageUrl: string;
    position: number;
    profile: {
      id: string;
      cabang: $Enums.CabangRole;
    };
  }[];
  profile: {
    id: string;
    heroUrl: string;
    tanggal: string;
    waktu: string;
    tempat: string;
  };
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

const Client = () => {
  const swiperRef1 = useRef<SwiperType>();
  const swiperRef2 = useRef<SwiperType>();
  const [hari, setHari] = useState("00");
  const [jam, setJam] = useState("00");
  const [menit, setMenit] = useState("00");
  const [detik, setDetik] = useState("00");
  const [isPerformance, setIsPerformance] = useState<string>("");
  const params = useParams();
  const [isBTSOpen, setIsBTSOpen] = useState(false);
  const [urlVideo, setUrlVideo] = useState("");
  const router = useRouter();

  const [dataGontor, setDataGontor] = useState<ParamsProps>();

  const current =
    mapCabang.find((item) => item.label === params.gontorId)?.slug ?? "";

  const handleGetGontor = async () => {
    try {
      const res = await axios.get(`/api/${params.gontorId}`);
      setDataGontor(res.data.data);
    } catch (error) {
      console.log(["ERROR_GET_PARAMS:"], error);
      router.push("/");
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

  const handleCountDown = () => {
    const difference =
      +new Date(dataGontor?.profile.tanggal + " " + dataGontor?.profile.waktu) -
      +new Date();

    if (difference > 0) {
      setHari(
        Math.floor(difference / (1000 * 60 * 60 * 24))
          .toString()
          .padStart(2, "0")
      );
      setJam(
        Math.floor((difference / (1000 * 60 * 60)) % 24)
          .toString()
          .padStart(2, "0")
      );
      setMenit(
        Math.floor((difference / 1000 / 60) % 60)
          .toString()
          .padStart(2, "0")
      );
      setDetik(
        Math.floor((difference / 1000) % 60)
          .toString()
          .padStart(2, "0")
      );
    } else {
      setHari("00");
      setJam("00");
      setMenit("00");
      setDetik("00");
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      handleCountDown();
    }, 1000);

    return () => clearTimeout(timer);
  });

  useEffect(() => {
    if (!isBTSOpen) {
      setUrlVideo("");
    }
  }, [isBTSOpen]);

  useEffect(() => {
    handleGetGontor();
  }, []);
  return (
    <>
      <section className="w-full aspect-square object-cover overflow-hidden -mt-16 relative">
        <Image
          className="pointer-events-none object-cover"
          src={
            dataGontor?.profile.heroUrl ??
            `/images/main/${
              current.includes("gontor-putri")
                ? "gontorGp" + current.toString().split("-")[2]
                : current.toString().split("-").join("")
            }.webp`
          }
          alt=""
          fill
        />
        <div className="absolute w-full h-14 bottom-0 left-0 bg-gradient-to-t from-[#EBF0E5] to-transparent" />
      </section>
      <section className="flex w-full gap-4 py-6">
        <div className="flex flex-col gap-4 w-full">
          <div className="border relative border-[#7B897F] w-full pl-4 pr-2 py-1.5 rounded-r-md">
            <h5 className="bg-[#EBF0E5] text-[#7B897F] px-1 absolute -top-1.5 left-3 text-xs leading-none">
              When?
            </h5>
            <p className="text-[#26401D] text-xs mt-2">
              {dataGontor?.profile.tanggal &&
                format(
                  parse(
                    dataGontor.profile.tanggal,
                    "dd MMMM yyyy",
                    new Date(),
                    {
                      locale: id,
                    }
                  ),
                  "EEEE, dd MMMM yyyy",
                  { locale: id }
                )}
            </p>
          </div>
          <div className="border relative border-[#7B897F] w-full px-4 py-1.5 rounded-r-md">
            <h5 className="bg-[#EBF0E5] text-[#7B897F] px-1 absolute -top-1.5 left-3 text-xs leading-none">
              Time?
            </h5>
            <p className="text-[#26401D] text-xs mt-2">
              {dataGontor?.profile.waktu}
            </p>
          </div>
        </div>
        <div className="border relative border-[#7B897F] w-full px-4 py-1.5 rounded-l-md flex items-center">
          <h5 className="bg-[#EBF0E5] text-[#7B897F] px-1 absolute -top-1.5 right-3 text-xs leading-none">
            Where?
          </h5>
          <p className="text-[#26401D] text-sm mt-2 text-right w-full">
            {dataGontor?.profile.tempat}
          </p>
        </div>
      </section>
      <section className="flex w-full">
        <div className="border-y relative border-[#7B897F] w-full px-4 py-3 flex items-center justify-between">
          <Globe className="h-7 w-7 text-[#7B897F]" />
          <div className="text-[#26401D] flex gap-4 items-center">
            <div className="flex flex-col items-center">
              <p className="text-sm text-black">{hari}</p>
              <p className="text-xs leading-none">DAYS</p>
            </div>
            <div className="flex flex-col items-center">
              <p className="text-sm text-black">{jam}</p>
              <p className="text-xs leading-none">HOURS</p>
            </div>
            <div className="flex flex-col items-center">
              <p className="text-sm text-black">{menit}</p>
              <p className="text-xs leading-none">MINUTES</p>
            </div>
            <div className="flex flex-col items-center">
              <p className="text-sm text-black">{detik}</p>
              <p className="text-xs leading-none">SECONDS</p>
            </div>
          </div>
          <Globe className="h-7 w-7 text-[#7B897F]" />
        </div>
      </section>
      {dataGontor?.roundowns && dataGontor.roundowns.length > 0 && (
        <section className="flex flex-col w-full py-10 border-b border-[#7B897F] justify-between px-3 gap-4">
          <div className="text-center w-full">
            <h3 className="text-lg">PERFORMANCE SETLIST</h3>
            <p className="text-xs">
              Witness the spectacular performance from PG 699
            </p>
          </div>
          <div className="flex gap-2 w-full relative">
            <div className="flex flex-col w-full *:text-xs *:h-8 *:justify-start *:font-normal hover:*:bg-[#7B897F]/40 *:text-black">
              {dataGontor.roundowns.map((item) => (
                <Button
                  key={item.id}
                  className={cn(
                    "capitalize",
                    isPerformance === item.id
                      ? "bg-[#7B897F]/40"
                      : "bg-transparent"
                  )}
                  onMouseEnter={(e) => {
                    e.preventDefault();
                    setIsPerformance(item.id);
                  }}
                >
                  {item.title}
                </Button>
              ))}
            </div>
            <div className="w-full">
              <div className="sticky top-20">
                <div className="relative w-full aspect-square rounded-md overflow-hidden">
                  {dataGontor?.roundowns &&
                    dataGontor.roundowns.map((item) => (
                      <Image
                        key={item.id}
                        className={cn(
                          "pointer-events-none object-cover bg-[#EBF0E5]",
                          isPerformance === item.id ? "z-10" : "z-0"
                        )}
                        src={item.imageUrl ?? "/images/main_image.jpg"}
                        alt=""
                        fill
                      />
                    ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
      {((dataGontor?.videos && dataGontor?.videos.length > 0) ||
        (dataGontor?.photos && dataGontor?.photos.length > 0)) && (
        <section className="flex w-full py-10 border-b border-[#7B897F] flex-col gap-2 h-full">
          <div className="text-center w-full">
            <h3 className="text-lg">BEHIND THE SCENE</h3>
            <p className="text-xs">
              Backstage pass you&apos;ve been waiting for
            </p>
          </div>
          {dataGontor?.videos && (
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

                {dataGontor.videos.map((item) => (
                  <Button
                    key={item.id}
                    onClick={() => handleOpenVideo(item.videoUrl)}
                    className="first:col-span-2 bg-transparent p-0 hover:bg-transparent w-full flex h-full group"
                  >
                    <Card className="w-full gap-2 flex flex-col overflow-hidden rounded-md shadow-sm bg-transparent">
                      <div className="w-full relatif object-cover first:aspect-video aspect-square relative  rounded-md overflow-hidden shadow-md">
                        <div className="w-full h-full absolute top-0 left-0 bg-white/20 backdrop-blur-sm z-20 group-hover:flex items-center justify-center hidden">
                          <PlayCircle className="w-12 h-12 stroke-[1.5]" />
                        </div>
                        <div className="pb-2 pt-4 overflow-hidden bg-gradient-to-b from-black/0 to-black/80 absolute bottom-0 z-10 w-full text-white text-start font-avenir font-semibold flex px-2 gap-1">
                          <h5 className="text-xs capitalize leading-tight line-clamp-2  overflow-hidden">
                            {item.title}
                          </h5>
                        </div>
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
                  onClick={() => router.push(`${params.gontorId}/bts-videos`)}
                  className="bg-transparent hover:bg-transparent rounded-full border text-black h-8 text-xs border-[#7B897F]"
                >
                  View More Videos
                </Button>
              </div>
            </div>
          )}
          {dataGontor?.photos && (
            <div className="flex flex-col gap-2">
              <div className="grid w-full p-3 grid-cols-3 gap-2 h-full">
                {dataGontor.photos.map((item) => (
                  <Button
                    key={item.id}
                    className="col-span-1 bg-transparent p-0 hover:bg-transparent w-full flex h-full group"
                  >
                    <Card className="w-full gap-2 flex flex-col overflow-hidden rounded-md shadow-sm bg-transparent">
                      <div className="w-full relatif object-cover aspect-square relative  rounded-md overflow-hidden">
                        <Image
                          className="object-cover pointer-events-none"
                          src={item.imageUrl}
                          alt=""
                          fill
                        />
                      </div>
                    </Card>
                  </Button>
                ))}
              </div>
              <div className="flex items-center justify-center">
                <Button
                  onClick={() => router.push(`${params.gontorId}/bts-images`)}
                  className="bg-transparent hover:bg-transparent rounded-full border text-black h-8 text-xs border-[#7B897F]"
                >
                  View More Photos
                </Button>
              </div>
            </div>
          )}
        </section>
      )}
      {dataGontor?.posts && dataGontor.posts.length > 0 && (
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
            {dataGontor.posts.map((item) => (
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
      {dataGontor?.posters && dataGontor.posters.length > 0 && (
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
              swiperRef1.current = swiper;
            }}
            className="mySwiper"
            id="poster"
          >
            <div className="flex justify-between mt-2">
              <div className="flex gap-2">
                <Button
                  className="w-8 h-8 p-0"
                  disabled={dataGontor.posters.length === 1}
                  onClick={() => swiperRef1.current?.slidePrev()}
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <Button
                  className="w-8 h-8 p-0"
                  disabled={dataGontor.posters.length === 1}
                  onClick={() => swiperRef1.current?.slideNext()}
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
            {dataGontor.posters.map((item) => (
              <SwiperSlide key={item.id} className="h-full">
                <Link href={`/posters/${item.id}`} className="w-full h-full">
                  <Card className="flex items-center w-full justify-center shadow-none relative flex-col h-full bg-transparent">
                    <div className="relative w-full aspect-[70/99] rounded-md overflow-hidden">
                      <div className="pb-2 pt-4 overflow-hidden bg-gradient-to-b from-black/0 to-black/80 absolute bottom-0 z-10 w-full text-white text-start font-avenir font-semibold flex px-2 gap-1">
                        <h5 className="text-xs capitalize leading-tight line-clamp-2  overflow-hidden">
                          {item.title}
                        </h5>
                      </div>
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
      {dataGontor?.supervisors &&
        (dataGontor.supervisors.chiefs.length > 0 ||
          dataGontor.supervisors.staff.length > 0) && (
          <section className="flex w-full py-10 px-3 border-b border-[#7B897F] flex-col gap-2 h-full">
            <div className="text-center w-full">
              <h3 className="text-lg">SUPERVISORS</h3>
              <p className="text-xs">
                The leaders who gives touch of wisdom behind every art
              </p>
            </div>
            <div className="flex items-center gap-2 mt-5">
              {dataGontor.supervisors.chiefs.length === 1 && (
                <Card className="flex items-center w-full justify-center shadow-none relative flex-col h-full"></Card>
              )}
              {dataGontor.supervisors.chiefs.map((item) => (
                <Card
                  className="flex items-center w-full justify-center shadow-none relative flex-col h-full"
                  key={item.id}
                >
                  <div className="relative w-full aspect-[3/4] rounded-md overflow-hidden">
                    <div className="h-10 bg-gradient-to-b from-black/0 to-black/80 absolute bottom-0 z-10 w-full text-white flex flex-col justify-end px-2 py-1 gap-1">
                      <h5 className="text-xs leading-none">{item.name}</h5>
                    </div>
                    <Image
                      src={item.imageUrl}
                      alt={item.name}
                      fill
                      className="object-cover pointer-events-none"
                    />
                  </div>
                </Card>
              ))}
              {dataGontor.supervisors.chiefs.length === 1 && (
                <Card className="flex items-center w-full justify-center shadow-none relative flex-col h-full"></Card>
              )}
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
                swiperRef2.current = swiper;
              }}
              className="mySwiper"
              id="supervisor"
            >
              <div className="flex gap-2 mt-2">
                <Button
                  className="w-8 h-8 p-0"
                  disabled={dataGontor.supervisors.staff.length <= 1}
                  onClick={() => swiperRef2.current?.slidePrev()}
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <Button
                  className="w-8 h-8 p-0"
                  disabled={dataGontor.supervisors.staff.length <= 1}
                  onClick={() => swiperRef2.current?.slideNext()}
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
              {dataGontor.supervisors.staff.map((item) => (
                <SwiperSlide key={item.id}>
                  <Card className="flex items-center w-full justify-center shadow-none relative flex-col h-full bg-transparent">
                    <div className="relative w-full aspect-square rounded-md overflow-hidden">
                      <div className="h-10 bg-gradient-to-b from-black/0 to-black/80 absolute bottom-0 z-10 w-full text-white flex flex-col justify-end px-2 py-1 gap-1">
                        <h5 className="text-xs leading-none">{item.name}</h5>
                      </div>
                      <Image
                        src={item.imageUrl}
                        alt={item.name}
                        fill
                        className="object-cover pointer-events-none"
                      />
                    </div>
                  </Card>
                </SwiperSlide>
              ))}
            </Swiper>
          </section>
        )}
      {dataGontor?.sponsorships && dataGontor.sponsorships.utama.length > 0 && (
        <section className="flex w-full py-10 px-3 border-b border-[#7B897F] flex-col gap-6 h-full">
          <div className="text-center w-full">
            <h3 className="text-lg">Sponsorship</h3>
            <p className="text-xs">Get closer with our sponsorship on site</p>
          </div>
          <div>
            <div className="grid grid-cols-2 gap-2">
              {dataGontor.sponsorships.utama.map((item) => (
                <Link href={item.href} key={item.id}>
                  <Card className="aspect-square p-2.5 rounded overflow-hidden">
                    <div className="relative w-full h-full">
                      <Image
                        src={item.imageUrl}
                        alt={item.name}
                        className="object-contain pointer-events-none"
                        fill
                      />
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
      {dataGontor?.faqs && dataGontor.faqs.length > 0 && (
        <section className="flex w-full py-10 px-3 border-b border-[#7B897F] flex-col gap-6 h-full">
          <div className="text-center w-full">
            <h3 className="text-lg">FAQ</h3>
            <p className="text-xs">Frequently Asked Questions</p>
          </div>
          <div>
            <Accordion type="single" collapsible className="w-full">
              {dataGontor.faqs.map((item) => (
                <AccordionItem
                  value={item.id}
                  className="border-[#7B897F]/30"
                  key={item.id}
                >
                  <AccordionTrigger className="text-sm text-start">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-800 font-medium font-avenir">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>
      )}
    </>
  );
};

export default Client;
