"use client";

import { Navbar } from "@/components/navbar";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import React from "react";

const BlogsPage = () => {
  const { gontorId } = useParams();
  return (
    <main className="bg-[#EBF0E5] font-revans w-screen min-h-screen h-auto relative">
      <Navbar isGontor />
      <section className="w-full h-full object-cover overflow-hidden relative px-4 pt-5 font-avenir font-normal gap-4 flex flex-col pb-10">
        <div className="flex items-center">
          <Link href={`/${gontorId}`} className="mr-2">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="uppercase text-lg font-revans leading-none">
              NEWS UPDATE
            </h1>
            <p className="text-sm capitalize font-semibold">
              {gontorId.includes("gontor-putri")
                ? "Gontor Putri " + gontorId.toString().split("-")[2]
                : "Gontor Putra " + gontorId.toString().split("-")[1]}
            </p>
          </div>
        </div>
        <Link href={"#"} className="gap-3 flex flex-col group">
          <div className="relative aspect-video w-full rounded-md overflow-hidden shadow-md">
            <Image
              src={"/images/main/gontor1.webp"}
              alt=""
              fill
              className="object-cover pointer-events-none"
            />
          </div>
          <div className="flex text-xs leading-none text-gray-500">
            <p>Author | 5 Mei 2024</p>
          </div>
          <h3 className="text-lg font-bold group-hover:underline leading-tight">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </h3>
          <p className="text-sm text-justify">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum,
            suscipit cupiditate deleniti eum accusantium quis perferendis
            doloremque minima tempore dolorum quas neque.
          </p>
        </Link>
        <Separator className="bg-gray-300" />
        <Link href={"#"} className="gap-3 flex flex-col group">
          <div className="flex text-xs leading-none text-gray-500">
            <p>Author | 5 Mei 2024</p>
          </div>
          <h3 className="text-lg font-bold group-hover:underline leading-tight">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </h3>
          <p className="text-sm text-justify">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum,
            suscipit cupiditate deleniti eum accusantium quis perferendis
            doloremque minima tempore dolorum quas neque.
          </p>
        </Link>
      </section>
    </main>
  );
};

export default BlogsPage;
