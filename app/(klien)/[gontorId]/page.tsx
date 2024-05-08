import { Navbar } from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Globe, PlayCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const GontorIdPage = () => {
  return (
    <main className="bg-[#EBF0E5] font-revans w-screen h-auto relative">
      <Navbar />
      <section className="w-full aspect-square object-cover overflow-hidden -mt-16 relative">
        <Image src={"/images/main/hero-branch.webp"} alt="" fill />
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
            Time?
          </h5>
          <p className="text-[#26401D] text-xs mt-2 text-right">
            Depan Masjid Jami&apos; Gontor
          </p>
        </div>
      </section>
      <section className="flex w-full pb-6">
        <div className="border relative border-[#7B897F] w-full px-4 py-1.5 flex items-center justify-between">
          <Globe className="h-5 w-5 text-[#7B897F]" />
          <div className="text-[#26401D] flex gap-2 items-center">
            <div className="flex flex-col items-center">
              <p className="text-sm text-black">20</p>
              <p className="text-[10px] leading-none">DAYS</p>
            </div>
            <div className="flex flex-col items-center">
              <p className="text-sm text-black">20</p>
              <p className="text-[10px] leading-none">HOURS</p>
            </div>
            <div className="flex flex-col items-center">
              <p className="text-sm text-black">20</p>
              <p className="text-[10px] leading-none">MINUTES</p>
            </div>
            <div className="flex flex-col items-center">
              <p className="text-sm text-black">20</p>
              <p className="text-[10px] leading-none">SECONDS</p>
            </div>
          </div>
          <Globe className="h-5 w-5 text-[#7B897F]" />
        </div>
      </section>
      <section className="flex flex-col w-full py-3 border-y border-[#7B897F] justify-between px-3 gap-4">
        <div className="text-center w-full">
          <h3>PERFORMANCE SETLIST</h3>
          <p className="text-xs">
            Witness the spectacular performance from PG 699
          </p>
        </div>
        <div className="flex gap-2 w-full relative">
          <div className="flex flex-col w-full *:h-8 *:justify-start *:font-normal *:bg-transparent hover:*:bg-[#7B897F]/40 *:text-black">
            <Button className="text-xs">Acara 1</Button>
            <Button className="text-xs">Acara 2</Button>
            <Button className="text-xs">Acara 3</Button>
            <Button className="text-xs">Acara 4</Button>
            <Button className="text-xs">Acara 5</Button>
            <Button className="text-xs">Acara 6</Button>
          </div>
          <div className="w-full">
            <div className="sticky top-20">
              <div className="relative w-full aspect-square rounded-md overflow-hidden">
                <Image src={"/images/main/hero-branch.webp"} alt="" fill />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="flex w-full p-3 border-y border-[#7B897F] flex-col gap-2 h-full">
        <div className="text-center w-full">
          <h3>BEHIND THE SCENE</h3>
          <p className="text-xs">Backstage pass you&apos;ve been waiting for</p>
        </div>
        <div className="flex flex-col gap-2">
          <div className="grid w-full p-3 grid-cols-2 gap-2 h-full">
            <Button className="col-span-2 bg-transparent p-0 hover:bg-transparent w-full flex h-full group">
              <Card className="w-full gap-2 flex flex-col overflow-hidden rounded-md shadow border bg-transparent border-gray-300">
                <div className="w-full relatif object-cover aspect-video relative  rounded-md overflow-hidden shadow-md">
                  <div className="w-full h-full absolute top-0 left-0 bg-white/20 backdrop-blur-sm z-10 group-hover:flex items-center justify-center hidden">
                    <PlayCircle className="w-12 h-12 stroke-[1.5]" />
                  </div>
                  <Image
                    className="object-cover"
                    src={"/images/main/gontor1.webp"}
                    alt=""
                    fill
                  />
                </div>
              </Card>
            </Button>
            <Button className="col-span-1 bg-transparent p-0 hover:bg-transparent w-full flex h-full group">
              <Card className="w-full gap-2 flex flex-col overflow-hidden rounded-md shadow border bg-transparent border-gray-300">
                <div className="w-full relatif object-cover aspect-video relative  rounded-md overflow-hidden shadow-md">
                  <div className="w-full h-full absolute top-0 left-0 bg-white/20 backdrop-blur-sm z-10 group-hover:flex items-center justify-center hidden">
                    <PlayCircle className="w-12 h-12 stroke-[1.5]" />
                  </div>
                  <Image
                    className="object-cover"
                    src={"/images/main/gontor1.webp"}
                    alt=""
                    fill
                  />
                </div>
              </Card>
            </Button>
            <Button className="col-span-1 bg-transparent p-0 hover:bg-transparent w-full flex h-full group">
              <Card className="w-full gap-2 flex flex-col overflow-hidden rounded-md shadow border bg-transparent border-gray-300">
                <div className="w-full relatif object-cover aspect-video relative  rounded-md overflow-hidden shadow-md">
                  <div className="w-full h-full absolute top-0 left-0 bg-white/20 backdrop-blur-sm z-10 group-hover:flex items-center justify-center hidden">
                    <PlayCircle className="w-12 h-12 stroke-[1.5]" />
                  </div>
                  <Image
                    className="object-cover"
                    src={"/images/main/gontor1.webp"}
                    alt=""
                    fill
                  />
                </div>
              </Card>
            </Button>
            <Button className="col-span-1 bg-transparent p-0 hover:bg-transparent w-full flex h-full group">
              <Card className="w-full gap-2 flex flex-col overflow-hidden rounded-md shadow border bg-transparent border-gray-300">
                <div className="w-full relatif object-cover aspect-video relative  rounded-md overflow-hidden shadow-md">
                  <div className="w-full h-full absolute top-0 left-0 bg-white/20 backdrop-blur-sm z-10 group-hover:flex items-center justify-center hidden">
                    <PlayCircle className="w-12 h-12 stroke-[1.5]" />
                  </div>
                  <Image
                    className="object-cover"
                    src={"/images/main/gontor1.webp"}
                    alt=""
                    fill
                  />
                </div>
              </Card>
            </Button>
            <Button className="col-span-1 bg-transparent p-0 hover:bg-transparent w-full flex h-full group">
              <Card className="w-full gap-2 flex flex-col overflow-hidden rounded-md shadow border bg-transparent border-gray-300">
                <div className="w-full relatif object-cover aspect-video relative  rounded-md overflow-hidden shadow-md">
                  <div className="w-full h-full absolute top-0 left-0 bg-white/20 backdrop-blur-sm z-10 group-hover:flex items-center justify-center hidden">
                    <PlayCircle className="w-12 h-12 stroke-[1.5]" />
                  </div>
                  <Image
                    className="object-cover"
                    src={"/images/main/gontor1.webp"}
                    alt=""
                    fill
                  />
                </div>
              </Card>
            </Button>
          </div>
          <div className="flex items-center justify-center">
            <Button className="bg-transparent hover:bg-transparent rounded-full border text-black h-8 text-xs border-[#7B897F]">
              View More Videos
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
};

export default GontorIdPage;
