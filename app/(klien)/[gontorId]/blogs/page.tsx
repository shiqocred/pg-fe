"use client";

import { Navbar } from "@/components/navbar";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import React from "react";

const BlogsPage = () => {
  const params = useParams();
  return (
    <main className="bg-[#EBF0E5] font-revans w-screen min-h-screen h-auto relative">
      <Navbar />
      <section className="w-full h-full object-cover overflow-hidden relative px-4 pt-5 font-avenir font-normal text-justify gap-4 flex flex-col pb-10">
        <div className="flex items-center">
          <Link href={`/${params.gontorId}`} className="mr-2">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h1 className="uppercase text-lg font-revans leading-none">
            NEWS UPDATE{" "}
            {params.gontorId.includes("gontor-putri")
              ? "Gontor Putri " + params.gontorId.toString().split("-")[2]
              : params.gontorId.toString().split("-").join(" ")}
          </h1>
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
          <h3 className="text-lg font-bold group-hover:underline leading-relaxed">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </h3>
          <p className="text-sm">
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
          <h3 className="text-lg font-bold group-hover:underline leading-relaxed">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </h3>
          <p className="text-sm">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum,
            suscipit cupiditate deleniti eum accusantium quis perferendis
            doloremque minima tempore dolorum quas neque.
          </p>
        </Link>
        <Separator className="bg-gray-300" />
        <Link href={"#"} className="gap-3 flex flex-col group">
          <div className="flex gap-3">
            <div className="relative aspect-square flex-none w-1/3 rounded overflow-hidden shadow-md">
              <Image
                src={"/images/main/gontor1.webp"}
                alt=""
                fill
                className="object-cover pointer-events-none"
              />
            </div>
            <div className="gap-3 flex flex-col">
              <div className="flex text-xs leading-none text-gray-500">
                <p>Author | 5 Mei 2024</p>
              </div>
              <h3 className="text-lg font-bold group-hover:underline leading-relaxed">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
              </h3>
            </div>
          </div>
          <p className="text-sm">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum,
            suscipit cupiditate deleniti eum accusantium quis perferendis
            doloremque minima tempore dolorum quas neque.
          </p>
        </Link>
        <Separator className="bg-gray-300" />
        <Link href={"#"} className="gap-3 flex flex-col group">
          <div className="flex gap-3">
            <div className="relative aspect-video flex-none w-1/3 rounded overflow-hidden shadow-md">
              <Image
                src={"/images/main/gontor1.webp"}
                alt=""
                fill
                className="object-cover pointer-events-none"
              />
            </div>
            <div className="gap-3 flex flex-col">
              <div className="flex text-xs leading-none text-gray-500">
                <p>Author | 5 Mei 2024</p>
              </div>
              <h3 className="text-lg font-bold group-hover:underline leading-relaxed">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
              </h3>
            </div>
          </div>
          <p className="text-sm">
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
