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
import React from "react";

const images = [
  "/images/main/gontor3.webp",
  "/images/main/gontor5.webp",
  "/images/main/gontor4.webp",
  "/images/main/gontor1.webp",
  "/images/main/gontor6.webp",
  "/images/main/gontor4.webp",
  "/images/main/gontor1.webp",
  "/images/main/gontor6.webp",
  "/images/main/gontor3.webp",
  "/images/main/gontor1.webp",
  "/images/main/gontor6.webp",
  "/images/main/gontor3.webp",
  "/images/main/gontor5.webp",
  "/images/main/gontor4.webp",
  "/images/main/gontor1.webp",
  "/images/main/gontor6.webp",
  "/images/main/gontor4.webp",
  "/images/main/gontor1.webp",
  "/images/main/gontor6.webp",
  "/images/main/gontor3.webp",
  "/images/main/gontor5.webp",
  "/images/main/gontor4.webp",
  "/images/main/gontor1.webp",
  "/images/main/gontor5.webp",
  "/images/main/gontor4.webp",
  "/images/main/gontor1.webp",
  "/images/main/gontor6.webp",
  "/images/main/gontor3.webp",
  "/images/main/gontor5.webp",
  "/images/main/gontor4.webp",
  "/images/main/gontor1.webp",
  "/images/main/gontor6.webp",
  "/images/main/gontor4.webp",
  "/images/main/gontor1.webp",
  "/images/main/gontor6.webp",
  "/images/main/gontor3.webp",
  "/images/main/gontor1.webp",
  "/images/main/gontor6.webp",
  "/images/main/gontor3.webp",
  "/images/main/gontor5.webp",
  "/images/main/gontor4.webp",
  "/images/main/gontor1.webp",
  "/images/main/gontor6.webp",
  "/images/main/gontor4.webp",
  "/images/main/gontor1.webp",
  "/images/main/gontor6.webp",
  "/images/main/gontor3.webp",
  "/images/main/gontor5.webp",
  "/images/main/gontor4.webp",
  "/images/main/gontor1.webp",
  "/images/main/gontor5.webp",
  "/images/main/gontor4.webp",
  "/images/main/gontor1.webp",
  "/images/main/gontor6.webp",
];

const BTSImagesPage = () => {
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
                <BreadcrumbPage>BTS Photos</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <ParallaxScroll images={images} />
      </section>
    </main>
  );
};

export default BTSImagesPage;
