"use client";

import { CardPondok } from "@/components/card-pondok";
import { Navbar } from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  PlayCircle,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useRef, useState } from "react";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperType } from "swiper/types";

const HomePage = () => {
  const [isBTSOpen, setIsBTSOpen] = useState(false);
  const router = useRouter();
  const swiperRef = useRef<SwiperType>();

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
      <section className="flex w-full py-10 flex-col gap-2 h-full">
        <div className="w-full flex flex-col justify-center items-center mb-4">
          <p className="font-semibold text-[#7B897F] leading-none text-3xl">
            EXPLORE
          </p>
          <p className="font-semibold text-[#7B897F] leading-none text-3xl">
            BEHIND THE SCENE
          </p>
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
              onClick={() => router.push(`/bts-videos`)}
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
              onClick={() => router.push(`/bts-images`)}
              className="bg-transparent hover:bg-transparent rounded-full border text-black h-8 text-xs border-[#7B897F]"
            >
              View More Photos
            </Button>
          </div>
        </div>
      </section>
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
          {Array.from({ length: 5 }, (_, i) => (
            <Card
              key={i}
              className="bg-transparent flex items-center font-avenir w-full justify-between shadow-none border-t-0 border-l-0 border-r-0 border-[#7B897F] rounded-none px-2 py-1"
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
            onClick={() => router.push(`/blogs`)}
            className="bg-transparent hover:bg-transparent rounded-full border text-black h-8 text-xs border-[#7B897F]"
          >
            View More News
          </Button>
        </div>
      </section>
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
            swiperRef.current = swiper;
          }}
          className="mySwiper"
          id="poster"
        >
          <div className="flex justify-between mt-2">
            <div className="flex gap-2">
              <Button
                className="w-8 h-8 p-0"
                onClick={() => swiperRef.current?.slidePrev()}
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <Button
                className="w-8 h-8 p-0"
                onClick={() => swiperRef.current?.slideNext()}
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
      <section className="w-screen relative overflow-x-hidden pt-10">
        <div className="w-full flex flex-col justify-center items-center mb-4">
          <p className="font-semibold text-[#7B897F] leading-none text-3xl">
            EXPLORE
          </p>
          <p className="font-semibold text-[#7B897F] leading-none text-3xl">
            MORE
          </p>
        </div>
        <div className="w-full px-3 pb-20 gap-2 grid grid-cols-2">
          <CardPondok
            href="/gontor-1"
            image="/images/main/gontor1.webp"
            location="Gontor, Ponorogo, Jawa Timur"
            title="PMDG Kampus Putra Pusat"
          />
          <CardPondok
            href="/gontor-3"
            image="/images/main/gontor3.webp"
            location="Kediri, Jawa Timur"
            title="PMDG Kampus Putra 3 - DarulMa'rifat"
          />
          <CardPondok
            href="/gontor-4"
            image="/images/main/gontor4.webp"
            location="Banyuwangi, Jawa Timur"
            title="PMDG Kampus Putra 4 - Darul Muttaqien"
          />
          <CardPondok
            href="/gontor-5"
            image="/images/main/gontor5.webp"
            location="Magelang, Jawa Tengah"
            title="PMDG Kampus Putra 5 - Darul Qiyam"
          />
          <CardPondok
            href="/gontor-6"
            image="/images/main/gontor6.webp"
            location="Konawe Selatan, Sulawesi Tenggara"
            title="PMDG Kampus Putra 6 - Riyadhatul Mujahidin"
          />
          <CardPondok
            href="/gontor-7"
            image="/images/main/gontor7.webp"
            location="Kalianda, Lampung"
            title="PMDG Kampus Putra 7"
          />
          <CardPondok
            href="/gontor-putri-1"
            image="/images/main/gontorGp1.webp"
            location="Ngawi, Jawa Timur"
            title="PMDG Kampus Putri 1"
          />
          <CardPondok
            href="/gontor-putri-3"
            image="/images/main/gontorGp3.webp"
            location="Ngawi, Jawa Timur"
            title="PMDG Kampus Putri 3"
          />
          <CardPondok
            href="/gontor-putri-4"
            image="/images/main/gontorGp4.webp"
            location="Kediri, Jawa Timur"
            title="PMDG Kampus Putri 4"
          />
          <CardPondok
            href="/gontor-putri-7"
            image="/images/main/gontorGp7.webp"
            location="Kampar, Riau"
            title="PMDG Kampus Putri 7"
          />
        </div>
      </section>
    </main>
  );
};

export default HomePage;
