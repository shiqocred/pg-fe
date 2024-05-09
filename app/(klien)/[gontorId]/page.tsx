import { InfiniteScrollCards } from "@/components/infinity-scroll";
import { Navbar } from "@/components/navbar";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, Globe, PlayCircle, ShieldCheck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const testimonials = [
  {
    quote:
      "It was the best of times, it was the worst of times, it was the age of wisdom, it was the age of foolishness, it was the epoch of belief, it was the epoch of incredulity, it was the season of Light, it was the season of Darkness, it was the spring of hope, it was the winter of despair.",
    name: "Charles Dickens",
    title: "A Tale of Two Cities",
  },
  {
    quote:
      "To be, or not to be, that is the question: Whether 'tis nobler in the mind to suffer The slings and arrows of outrageous fortune, Or to take Arms against a Sea of troubles, And by opposing end them: to die, to sleep.",
    name: "William Shakespeare",
    title: "Hamlet",
  },
  {
    quote: "All that we see or seem is but a dream within a dream.",
    name: "Edgar Allan Poe",
    title: "A Dream Within a Dream",
  },
  {
    quote:
      "It is a truth universally acknowledged, that a single man in possession of a good fortune, must be in want of a wife.",
    name: "Jane Austen",
    title: "Pride and Prejudice",
  },
  {
    quote:
      "Call me Ishmael. Some years ago—never mind how long precisely—having little or no money in my purse, and nothing particular to interest me on shore, I thought I would sail about a little and see the watery part of the world.",
    name: "Herman Melville",
    title: "Moby-Dick",
  },
];

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
          <p className="text-[#26401D] text-sm mt-2 text-right">
            Depan Masjid Jami&apos; Gontor
          </p>
        </div>
      </section>
      <section className="flex w-full">
        <div className="border-y relative border-[#7B897F] w-full px-4 py-1.5 flex items-center justify-between">
          <Globe className="h-5 w-5 text-[#7B897F]" />
          <div className="text-[#26401D] flex gap-4 items-center">
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
      <section className="flex flex-col w-full py-10 border-b border-[#7B897F] justify-between px-3 gap-4">
        <div className="text-center w-full">
          <h3 className="text-lg">PERFORMANCE SETLIST</h3>
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
      <section className="flex w-full py-10 border-b border-[#7B897F] flex-col gap-2 h-full">
        <div className="text-center w-full">
          <h3 className="text-lg">BEHIND THE SCENE</h3>
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
        <div className="flex flex-col gap-2">
          <div className="grid w-full p-3 grid-cols-3 gap-2 h-full">
            <Button className="col-span-1 bg-transparent p-0 hover:bg-transparent w-full flex h-full group">
              <Card className="w-full gap-2 flex flex-col overflow-hidden rounded-md shadow border bg-transparent border-gray-300">
                <div className="w-full relatif object-cover aspect-square relative  rounded-md overflow-hidden">
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
                <div className="w-full relatif object-cover aspect-square relative  rounded-md overflow-hidden">
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
                <div className="w-full relatif object-cover aspect-square relative  rounded-md overflow-hidden">
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
                <div className="w-full relatif object-cover aspect-square relative  rounded-md overflow-hidden">
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
                <div className="w-full relatif object-cover aspect-square relative  rounded-md overflow-hidden">
                  <Image
                    className="object-cover"
                    src={"/images/main/gontor1.webp"}
                    alt=""
                    fill
                  />
                </div>{" "}
              </Card>
            </Button>
            <Button className="col-span-1 bg-transparent p-0 hover:bg-transparent w-full flex h-full group">
              <Card className="w-full gap-2 flex flex-col overflow-hidden rounded-md shadow border bg-transparent border-gray-300">
                <div className="w-full relatif object-cover aspect-square relative  rounded-md overflow-hidden">
                  <Image
                    className="object-cover"
                    src={"/images/main/gontor1.webp"}
                    alt=""
                    fill
                  />
                </div>
              </Card>
            </Button>{" "}
          </div>
          <div className="flex items-center justify-center">
            <Button className="bg-transparent hover:bg-transparent rounded-full border text-black h-8 text-xs border-[#7B897F]">
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
          <Card className="bg-transparent flex items-center w-full justify-between shadow-none border-t-0 border-l-0 border-r-0 border-b border-[#7B897F] rounded-none px-2 py-0.5">
            <div>
              <div className="flex items-center gap-1 text-xs">
                <p>tanggal</p>
                <p>-</p>
                <p>author</p>
              </div>
              <div className="text-sm">Title</div>
            </div>
            <div>
              <ArrowRight className="w-4 h-4" />
            </div>
          </Card>
          <Card className="bg-transparent flex items-center w-full justify-between shadow-none border-t-0 border-l-0 border-r-0 border-b border-[#7B897F] rounded-none px-2 py-0.5">
            <div>
              <div className="flex items-center gap-1 text-xs">
                <p>tanggal</p>
                <p>-</p>
                <p>author</p>
              </div>
              <div className="text-sm">Title</div>
            </div>
            <div>
              <ArrowRight className="w-4 h-4" />
            </div>
          </Card>
          <Card className="bg-transparent flex items-center w-full justify-between shadow-none border-t-0 border-l-0 border-r-0 border-b border-[#7B897F] rounded-none px-2 py-0.5">
            <div>
              <div className="flex items-center gap-1 text-xs">
                <p>tanggal</p>
                <p>-</p>
                <p>author</p>
              </div>
              <div className="text-sm">Title</div>
            </div>
            <div>
              <ArrowRight className="w-4 h-4" />
            </div>
          </Card>
          <Card className="bg-transparent flex items-center w-full justify-between shadow-none border-t-0 border-l-0 border-r-0 border-b border-[#7B897F] rounded-none px-2 py-0.5">
            <div>
              <div className="flex items-center gap-1 text-xs">
                <p>tanggal</p>
                <p>-</p>
                <p>author</p>
              </div>
              <div className="text-sm">Title</div>
            </div>
            <div>
              <ArrowRight className="w-4 h-4" />
            </div>
          </Card>
        </div>
        <div className="flex items-center justify-center mt-3">
          <Button className="bg-transparent hover:bg-transparent rounded-full border text-black h-8 text-xs border-[#7B897F]">
            View More News
          </Button>
        </div>
      </section>
      <section className="flex w-full py-10 px-3 border-b border-[#7B897F] flex-col gap-2 h-full">
        <div className="text-center w-full">
          <h3 className="text-lg">SUPERVAISORS</h3>
          <p className="text-xs">
            The leaders who gives touch of wisdom behind every art
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Card className="flex items-center w-full justify-center shadow-none relative flex-col h-full">
            <div className="relative w-full aspect-[3/4] rounded-md overflow-hidden">
              <div className="h-10 bg-gradient-to-b from-black/0 to-black/80 absolute bottom-0 z-10 w-full text-white flex flex-col justify-end px-2 py-1 gap-1">
                <h5 className="text-xs leading-none">Miftahudin Isro</h5>
              </div>
              <Image
                src={"/images/supervisors/profile_1.webp"}
                alt=""
                fill
                className="object-cover"
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
                className="object-cover"
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
                className="object-cover"
              />
            </div>
          </Card>
        </div>
        <div className="rounded-md flex flex-col antialiased dark:bg-grid-white/[0.05] items-center justify-center relative overflow-hidden">
          <InfiniteScrollCards
            items={testimonials}
            direction="right"
            speed="slow"
          />
        </div>
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
                  className="object-contain"
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
                  className="object-contain"
                  fill
                />
              </div>
            </Card>
            <Card className="aspect-square col-span-1 p-3">
              <div className="relative w-full h-full">
                <Image
                  src={"/images/sponsorship/logo_fordev.webp"}
                  alt=""
                  className="object-contain"
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
                  className="object-contain"
                  fill
                />
              </div>
            </Card>
            <Card className="aspect-square col-span-1 p-3">
              <div className="relative w-full h-full">
                <Image
                  src={"/images/sponsorship/logo_fordev.webp"}
                  alt=""
                  className="object-contain"
                  fill
                />
              </div>
            </Card>
            <Card className="aspect-square col-span-1 p-3">
              <div className="relative w-full h-full">
                <Image
                  src={"/images/sponsorship/logo_fordev.webp"}
                  alt=""
                  className="object-contain"
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
                  className="object-contain"
                  fill
                />
              </div>
            </Card>
            <Card className="aspect-square col-span-1 p-2">
              <div className="relative w-full h-full">
                <Image
                  src={"/images/sponsorship/just_logo_fordev.webp"}
                  alt=""
                  className="object-contain"
                  fill
                />
              </div>
            </Card>
            <Card className="aspect-square col-span-1 p-2">
              <div className="relative w-full h-full">
                <Image
                  src={"/images/sponsorship/just_logo_fordev.webp"}
                  alt=""
                  className="object-contain"
                  fill
                />
              </div>
            </Card>
            <Card className="aspect-square col-span-1 p-2">
              <div className="relative w-full h-full">
                <Image
                  src={"/images/sponsorship/just_logo_fordev.webp"}
                  alt=""
                  className="object-contain"
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
                  className="object-contain"
                  fill
                />
              </div>
            </Card>
            <Card className="aspect-square col-span-1 p-2">
              <div className="relative w-full h-full">
                <Image
                  src={"/images/sponsorship/just_logo_fordev.webp"}
                  alt=""
                  className="object-contain"
                  fill
                />
              </div>
            </Card>
            <Card className="aspect-square col-span-1 p-2">
              <div className="relative w-full h-full">
                <Image
                  src={"/images/sponsorship/just_logo_fordev.webp"}
                  alt=""
                  className="object-contain"
                  fill
                />
              </div>
            </Card>
            <Card className="aspect-square col-span-1 p-2">
              <div className="relative w-full h-full">
                <Image
                  src={"/images/sponsorship/just_logo_fordev.webp"}
                  alt=""
                  className="object-contain"
                  fill
                />
              </div>
            </Card>
            <Card className="aspect-square col-span-1 p-2">
              <div className="relative w-full h-full">
                <Image
                  src={"/images/sponsorship/just_logo_fordev.webp"}
                  alt=""
                  className="object-contain"
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
