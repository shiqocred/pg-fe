"use client";

import { Navbar } from "@/components/navbar";
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
import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { Swiper as SwiperType } from "swiper/types";
import { useParams, useRouter } from "next/navigation";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

const performanceMap = [
  {
    id: 1,
    label: "Dance",
    href: "/images/main/gontor1.webp",
  },
  {
    id: 2,
    label: "Choir",
    href: "/images/main/gontor3.webp",
  },
  {
    id: 3,
    label: "Opening",
    href: "/images/main/gontor4.webp",
  },
  {
    id: 4,
    label: "Shuffle",
    href: "/images/main/gontor5.webp",
  },
  {
    id: 5,
    label: "Taekowndo",
    href: "/images/main/gontor6.webp",
  },
];

const GontorIdPage = () => {
  const swiperRef1 = useRef<SwiperType>();
  const swiperRef2 = useRef<SwiperType>();
  const [isBTSOpen, setIsBTSOpen] = useState(false);
  const params = useParams();
  const router = useRouter();
  const [isPerformance, setIsPerformance] = useState<number>(1);
  return (
    <main className="bg-[#EBF0E5] font-revans w-screen h-auto relative">
      <Navbar isGontor />
      <section className="w-full aspect-square object-cover overflow-hidden -mt-16 relative">
        <Image
          className="pointer-events-none object-cover"
          src={`/images/main/${
            params.gontorId.includes("gontor-putri")
              ? "gontorGp" + params.gontorId.toString().split("-")[2]
              : params.gontorId.toString().split("-").join("")
          }.webp`}
          alt=""
          fill
        />
        <div className="absolute w-full h-14 bottom-0 left-0 bg-gradient-to-t from-[#EBF0E5] to-transparent" />
      </section>
      <section className="flex w-full gap-4 py-6">
        <div className="flex flex-col gap-4 w-full">
          <div className="border relative border-[#7B897F] w-full px-4 py-1.5 rounded-r-md">
            <h5 className="bg-[#EBF0E5] text-[#7B897F] px-1 absolute -top-1.5 left-3 text-xs leading-none">
              When?
            </h5>
            <p className="text-[#26401D] text-xs mt-2">Sabtu, 16 Juni 2024</p>
          </div>
          <div className="border relative border-[#7B897F] w-full px-4 py-1.5 rounded-r-md">
            <h5 className="bg-[#EBF0E5] text-[#7B897F] px-1 absolute -top-1.5 left-3 text-xs leading-none">
              Time?
            </h5>
            <p className="text-[#26401D] text-xs mt-2">20.00</p>
          </div>
        </div>
        <div className="border relative border-[#7B897F] w-full px-4 py-1.5 rounded-l-md flex items-center">
          <h5 className="bg-[#EBF0E5] text-[#7B897F] px-1 absolute -top-1.5 right-3 text-xs leading-none">
            Where?
          </h5>
          <p className="text-[#26401D] text-sm mt-2 text-right">
            Depan Masjid Jami&apos; Gontor
          </p>
        </div>
      </section>
      <section className="flex w-full">
        <div className="border-y relative border-[#7B897F] w-full px-4 py-3 flex items-center justify-between">
          <Globe className="h-7 w-7 text-[#7B897F]" />
          <div className="text-[#26401D] flex gap-4 items-center">
            <div className="flex flex-col items-center">
              <p className="text-sm text-black">20</p>
              <p className="text-xs leading-none">DAYS</p>
            </div>
            <div className="flex flex-col items-center">
              <p className="text-sm text-black">20</p>
              <p className="text-xs leading-none">HOURS</p>
            </div>
            <div className="flex flex-col items-center">
              <p className="text-sm text-black">20</p>
              <p className="text-xs leading-none">MINUTES</p>
            </div>
            <div className="flex flex-col items-center">
              <p className="text-sm text-black">20</p>
              <p className="text-xs leading-none">SECONDS</p>
            </div>
          </div>
          <Globe className="h-7 w-7 text-[#7B897F]" />
        </div>
      </section>
      <section className="flex flex-col w-full py-10 border-b border-[#7B897F] justify-between px-3 gap-4">
        <div className="text-center w-full">
          <h3 className="text-lg">PERFORMANCE SETLIST</h3>
          <p className="text-xs">
            Witness the spectacular performance from PG 699
          </p>
        </div>
        <div className="flex gap-2 w-full relative">
          <div className="flex flex-col w-full *:text-xs *:h-8 *:justify-start *:font-normal hover:*:bg-[#7B897F]/40 *:text-black">
            {performanceMap.map((item) => (
              <Button
                key={item.id}
                className={cn(
                  isPerformance === item.id
                    ? "bg-[#7B897F]/40"
                    : "bg-transparent"
                )}
                onMouseEnter={(e) => {
                  e.preventDefault();
                  setIsPerformance(item.id);
                }}
              >
                {item.label}
              </Button>
            ))}
          </div>
          <div className="w-full">
            <div className="sticky top-20">
              <div className="relative w-full aspect-square rounded-md overflow-hidden">
                {performanceMap.map((item) => (
                  <Image
                    key={item.id}
                    className={cn(
                      "pointer-events-none object-cover",
                      isPerformance === item.id ? "z-10" : "z-0"
                    )}
                    src={item.href}
                    alt=""
                    fill
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="flex w-full py-10 border-b border-[#7B897F] flex-col gap-2 h-full">
        <div className="text-center w-full">
          <h3 className="text-lg">BEHIND THE SCENE</h3>
          <p className="text-xs">Backstage pass you&apos;ve been waiting for</p>
        </div>
        <div className="flex flex-col gap-2">
          <div className="grid w-full p-3 grid-cols-2 gap-2 h-full">
            <Dialog open={isBTSOpen} onOpenChange={setIsBTSOpen}>
              <DialogContent className="p-2">
                <iframe
                  src={`https://www.youtube.com/embed/QwbK1GUWN30?vq=hd1080&modestbranding=1&rel=0&hl=id-ID`}
                  className="w-full aspect-video rounded-md"
                  title={"fgh"}
                />
              </DialogContent>
            </Dialog>

            {Array.from({ length: 5 }, (_, i) => (
              <Button
                key={i}
                onClick={() => setIsBTSOpen(true)}
                className="first:col-span-2 bg-transparent p-0 hover:bg-transparent w-full flex h-full group"
              >
                <Card className="w-full gap-2 flex flex-col overflow-hidden rounded-md shadow-sm bg-transparent">
                  <div className="w-full relatif object-cover aspect-video relative  rounded-md overflow-hidden shadow-md">
                    <div className="w-full h-full absolute top-0 left-0 bg-white/20 backdrop-blur-sm z-10 group-hover:flex items-center justify-center hidden">
                      <PlayCircle className="w-12 h-12 stroke-[1.5]" />
                    </div>
                    <Image
                      className="object-cover pointer-events-none"
                      src={"/images/main/gontor1.webp"}
                      alt=""
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
        <div className="flex flex-col gap-2">
          <div className="grid w-full p-3 grid-cols-3 gap-2 h-full">
            {Array.from({ length: 6 }, (_, i) => (
              <Button
                key={i}
                className="col-span-1 bg-transparent p-0 hover:bg-transparent w-full flex h-full group"
              >
                <Card className="w-full gap-2 flex flex-col overflow-hidden rounded-md shadow-sm bg-transparent">
                  <div className="w-full relatif object-cover aspect-square relative  rounded-md overflow-hidden">
                    <Image
                      className="object-cover pointer-events-none"
                      src={"/images/main/gontor1.webp"}
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
      </section>
      <section className="flex w-full py-10 px-3 border-b border-[#7B897F] flex-col gap-2 h-full">
        <div className="text-center w-full">
          <h3 className="text-lg">NEWS UPDATE</h3>
          <p className="text-xs">???????</p>
        </div>
        <div className="flex flex-col gap-2">
          {Array.from({ length: 5 }, (_, i) => (
            <Card
              key={i}
              className="bg-transparent flex items-center font-avenir w-full justify-between shadow-none border-t-0 border-l-0 border-r-0 border-b border-[#7B897F] rounded-none px-2 py-1"
            >
              <div className="flex-1 flex flex-col gap-2">
                <div className="flex items-center text-xs">
                  <p>Author | 5 Mei 2024</p>
                </div>
                <div className="font-semibold w-full">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
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
            onClick={() => router.push(`${params.gontorId}/blogs`)}
            className="bg-transparent hover:bg-transparent rounded-full border text-black h-8 text-xs border-[#7B897F]"
          >
            View More News
          </Button>
        </div>
      </section>
      <section className="flex w-full py-10 px-3 border-b border-[#7B897F] flex-col gap-2 h-full">
        <div className="text-center w-full mb-4">
          <h3 className="text-lg">POSTERS</h3>
          <p className="text-xs">Imagine the news</p>
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
          <div className="flex gap-2 mt-2">
            <Button
              className="w-8 h-8 p-0"
              onClick={() => swiperRef1.current?.slidePrev()}
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <Button
              className="w-8 h-8 p-0"
              onClick={() => swiperRef1.current?.slideNext()}
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
          {Array.from({ length: 10 }, (_, i) => (
            <SwiperSlide key={i}>
              <Link href="#">
                <Card className="flex items-center w-full justify-center shadow-none relative flex-col h-full bg-transparent">
                  <div className="relative w-full aspect-[70/99] rounded-md overflow-hidden">
                    <div className="h-9 overflow-hidden bg-gradient-to-b from-black/0 to-black/80 absolute bottom-0 z-10 w-full text-white text-start font-avenir font-semibold flex px-2 py-1 gap-1">
                      <h5 className="text-xs leading-tight line-clamp-2  overflow-hidden">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Sint, perspiciatis.
                      </h5>
                    </div>
                    <Image
                      src={"/images/supervisors/profile_1.webp"}
                      alt=""
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
      <section className="flex w-full py-10 px-3 border-b border-[#7B897F] flex-col gap-2 h-full">
        <div className="text-center w-full">
          <h3 className="text-lg">SUPERVISORS</h3>
          <p className="text-xs">
            The leaders who gives touch of wisdom behind every art
          </p>
        </div>
        <div className="flex items-center gap-2 mt-5">
          <Card className="flex items-center w-full justify-center shadow-none relative flex-col h-full">
            <div className="relative w-full aspect-[3/4] rounded-md overflow-hidden">
              <div className="h-10 bg-gradient-to-b from-black/0 to-black/80 absolute bottom-0 z-10 w-full text-white flex flex-col justify-end px-2 py-1 gap-1">
                <h5 className="text-xs leading-none">Miftahudin Isro</h5>
              </div>
              <Image
                src={"/images/supervisors/profile_1.webp"}
                alt=""
                fill
                className="object-cover pointer-events-none"
              />
            </div>
          </Card>
          <Card className="flex items-center w-full justify-center shadow-none relative flex-col h-full">
            <div className="relative w-full aspect-[3/4] rounded-md overflow-hidden">
              <div className="h-10 bg-gradient-to-b from-black/0 to-black/80 absolute bottom-0 z-10 w-full text-white flex flex-col justify-end px-2 py-1 gap-1">
                <h5 className="text-xs leading-none">Miftahudin Isro</h5>
              </div>
              <Image
                src={"/images/supervisors/profile.webp"}
                alt=""
                fill
                className="object-cover pointer-events-none"
              />
            </div>
          </Card>
          <Card className="flex items-center w-full justify-center shadow-none relative flex-col h-full">
            <div className="relative w-full aspect-[3/4] rounded-md overflow-hidden">
              <div className="h-10 bg-gradient-to-b from-black/0 to-black/80 absolute bottom-0 z-10 w-full text-white flex flex-col justify-end px-2 py-1 gap-1">
                <h5 className="text-xs leading-none">Miftahudin Isro</h5>
              </div>
              <Image
                src={"/images/supervisors/profile_1.webp"}
                alt=""
                fill
                className="object-cover pointer-events-none"
              />
            </div>
          </Card>
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
              onClick={() => swiperRef2.current?.slidePrev()}
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <Button
              className="w-8 h-8 p-0"
              onClick={() => swiperRef2.current?.slideNext()}
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
          {Array.from({ length: 10 }, (_, i) => (
            <SwiperSlide key={i}>
              <Card className="flex items-center w-full justify-center shadow-none relative flex-col h-full bg-transparent">
                <div className="relative w-full aspect-square rounded-md overflow-hidden">
                  <div className="h-10 bg-gradient-to-b from-black/0 to-black/80 absolute bottom-0 z-10 w-full text-white flex flex-col justify-end px-2 py-1 gap-1">
                    <h5 className="text-xs leading-none">Miftahudin Isro</h5>
                  </div>
                  <Image
                    src={"/images/supervisors/profile_1.webp"}
                    alt=""
                    fill
                    className="object-cover pointer-events-none"
                  />
                </div>
              </Card>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>
      <section className="flex w-full py-10 px-3 border-b border-[#7B897F] flex-col gap-6 h-full">
        <div className="text-center w-full">
          <h3 className="text-lg">Sponsorship</h3>
          <p className="text-xs">Get closer with our sponsorship on site</p>
        </div>
        <div>
          <h3 className="text-sm flex items-center gap-1 leading-none mb-2 border-b border-gray-300">
            <ShieldCheck className="h-3 w-3 mb-1" />
            Sponsor Tunggal
          </h3>
          <div className="grid grid-cols-1">
            <Card className="aspect-square col-span-1 p-3">
              <div className="relative w-full h-full">
                <Image
                  src={"/images/sponsorship/logo_fordev.webp"}
                  alt=""
                  className="object-contain pointer-events-none"
                  fill
                />
              </div>
            </Card>
          </div>
        </div>
        <div>
          <h3 className="text-sm flex items-center gap-1 leading-none mb-2 border-b border-gray-300">
            <ShieldCheck className="h-3 w-3 mb-1" />
            Sponsor Utama
          </h3>
          <div className="grid grid-cols-2 gap-2">
            <Card className="aspect-square col-span-1 p-3">
              <div className="relative w-full h-full">
                <Image
                  src={"/images/sponsorship/logo_fordev.webp"}
                  alt=""
                  className="object-contain pointer-events-none"
                  fill
                />
              </div>
            </Card>
            <Card className="aspect-square col-span-1 p-3">
              <div className="relative w-full h-full">
                <Image
                  src={"/images/sponsorship/logo_fordev.webp"}
                  alt=""
                  className="object-contain pointer-events-none"
                  fill
                />
              </div>
            </Card>
          </div>
        </div>
        <div>
          <h3 className="text-sm flex items-center gap-1 leading-none mb-2 border-b border-gray-300">
            <ShieldCheck className="h-3 w-3 mb-1" />
            Sponsor Pendamping 1
          </h3>
          <div className="grid grid-cols-3 gap-2">
            <Card className="aspect-square col-span-1 p-3">
              <div className="relative w-full h-full">
                <Image
                  src={"/images/sponsorship/logo_fordev.webp"}
                  alt=""
                  className="object-contain pointer-events-none"
                  fill
                />
              </div>
            </Card>
            <Card className="aspect-square col-span-1 p-3">
              <div className="relative w-full h-full">
                <Image
                  src={"/images/sponsorship/logo_fordev.webp"}
                  alt=""
                  className="object-contain pointer-events-none"
                  fill
                />
              </div>
            </Card>
            <Card className="aspect-square col-span-1 p-3">
              <div className="relative w-full h-full">
                <Image
                  src={"/images/sponsorship/logo_fordev.webp"}
                  alt=""
                  className="object-contain pointer-events-none"
                  fill
                />
              </div>
            </Card>
          </div>
        </div>
        <div>
          <h3 className="text-sm flex items-center gap-1 leading-none mb-2 border-b border-gray-300">
            <ShieldCheck className="h-3 w-3 mb-1" />
            Sponsor Pendamping 2
          </h3>
          <div className="grid grid-cols-4 gap-1.5">
            <Card className="aspect-square col-span-1 p-2">
              <div className="relative w-full h-full">
                <Image
                  src={"/images/sponsorship/just_logo_fordev.webp"}
                  alt=""
                  className="object-contain pointer-events-none"
                  fill
                />
              </div>
            </Card>
            <Card className="aspect-square col-span-1 p-2">
              <div className="relative w-full h-full">
                <Image
                  src={"/images/sponsorship/just_logo_fordev.webp"}
                  alt=""
                  className="object-contain pointer-events-none"
                  fill
                />
              </div>
            </Card>
            <Card className="aspect-square col-span-1 p-2">
              <div className="relative w-full h-full">
                <Image
                  src={"/images/sponsorship/just_logo_fordev.webp"}
                  alt=""
                  className="object-contain pointer-events-none"
                  fill
                />
              </div>
            </Card>
            <Card className="aspect-square col-span-1 p-2">
              <div className="relative w-full h-full">
                <Image
                  src={"/images/sponsorship/just_logo_fordev.webp"}
                  alt=""
                  className="object-contain pointer-events-none"
                  fill
                />
              </div>
            </Card>
          </div>
        </div>
        <div>
          <h3 className="text-sm flex items-center gap-1 leading-none mb-2 border-b border-gray-300">
            <ShieldCheck className="h-3 w-3 mb-1" />
            Sponsor Pendamping 3
          </h3>
          <div className="grid grid-cols-5 gap-1">
            <Card className="aspect-square col-span-1 p-2">
              <div className="relative w-full h-full">
                <Image
                  src={"/images/sponsorship/just_logo_fordev.webp"}
                  alt=""
                  className="object-contain pointer-events-none"
                  fill
                />
              </div>
            </Card>
            <Card className="aspect-square col-span-1 p-2">
              <div className="relative w-full h-full">
                <Image
                  src={"/images/sponsorship/just_logo_fordev.webp"}
                  alt=""
                  className="object-contain pointer-events-none"
                  fill
                />
              </div>
            </Card>
            <Card className="aspect-square col-span-1 p-2">
              <div className="relative w-full h-full">
                <Image
                  src={"/images/sponsorship/just_logo_fordev.webp"}
                  alt=""
                  className="object-contain pointer-events-none"
                  fill
                />
              </div>
            </Card>
            <Card className="aspect-square col-span-1 p-2">
              <div className="relative w-full h-full">
                <Image
                  src={"/images/sponsorship/just_logo_fordev.webp"}
                  alt=""
                  className="object-contain pointer-events-none"
                  fill
                />
              </div>
            </Card>
            <Card className="aspect-square col-span-1 p-2">
              <div className="relative w-full h-full">
                <Image
                  src={"/images/sponsorship/just_logo_fordev.webp"}
                  alt=""
                  className="object-contain pointer-events-none"
                  fill
                />
              </div>
            </Card>
          </div>
        </div>
      </section>
      <section className="flex w-full py-10 px-3 border-b border-[#7B897F] flex-col gap-6 h-full">
        <div className="text-center w-full">
          <h3 className="text-lg">FAQ</h3>
          <p className="text-xs">Frequently Asked Questions</p>
        </div>
        <div>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="faq-1" className="border-[#7B897F]/30">
              <AccordionTrigger className="text-sm text-start">
                Where can i book ticket to attend Panggung Gembira?
              </AccordionTrigger>
              <AccordionContent className="text-gray-800 font-medium font-avenir">
                ????
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="faq-2" className="border-[#7B897F]/30">
              <AccordionTrigger className="text-sm text-start">
                Did Panggung Gembira Comittee accept sponsorship?
              </AccordionTrigger>
              <AccordionContent className="text-gray-800 font-medium font-avenir">
                ????
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="faq-3" className="border-[#7B897F]/30">
              <AccordionTrigger className="text-sm text-start">
                Is there any live streaming for Panggung Gembira?
              </AccordionTrigger>
              <AccordionContent className="text-gray-800 font-medium font-avenir">
                ????
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="faq-4" className="border-[#7B897F]/30">
              <AccordionTrigger className="text-sm text-start">
                I have additional question, whom can i contact?
              </AccordionTrigger>
              <AccordionContent className="text-gray-800 font-medium font-avenir">
                We&apos;re here to help. Reach us at contact@pg699.com
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>
    </main>
  );
};

export default GontorIdPage;
