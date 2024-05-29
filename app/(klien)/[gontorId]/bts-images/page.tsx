"use client";

import { Navbar } from "@/components/navbar";
import { ParallaxScroll } from "@/components/parallax-scroll";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
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
  const params = useParams();
  return (
    <main className="bg-[#EBF0E5] font-revans w-screen min-h-screen h-auto relative">
      <Navbar isGontor />
      <section className="w-full h-full object-cover overflow-hidden relative px-4 pt-5 font-avenir font-normal text-justify gap-4 flex flex-col pb-10">
        <div className="flex items-center">
          <Link href={`/${params.gontorId}`} className="mr-2">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="uppercase text-lg font-revans leading-none">
              BEHIND THE SCENE
            </h1>
            <p className="text-sm capitalize font-semibold">
              {params.gontorId.includes("gontor-putri")
                ? "Gontor Putri " + params.gontorId.toString().split("-")[2]
                : "Gontor Putra " + params.gontorId.toString().split("-")[1]}
            </p>
          </div>
        </div>
        <ParallaxScroll images={images} />
      </section>
    </main>
  );
};

export default BTSImagesPage;
