"use client";

import { Navbar } from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { ArrowLeft, PlayCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useState } from "react";

const BTSVideosPage = () => {
  const params = useParams();
  const [isBTSOpen, setIsBTSOpen] = useState(false);
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
        <Dialog open={isBTSOpen} onOpenChange={setIsBTSOpen}>
          <DialogContent className="p-2">
            <iframe
              src={`https://www.youtube.com/embed/QwbK1GUWN30?vq=hd1080&modestbranding=1&rel=0&hl=id-ID`}
              className="w-full aspect-video rounded-md"
              title={"fgh"}
            />
          </DialogContent>
        </Dialog>
        <div className="w-full flex flex-col gap-4">
          {Array.from({ length: 5 }, (_, i) => (
            <button
              key={i}
              onClick={() => setIsBTSOpen(true)}
              className="group hover:bg-white/20 p-2 rounded hover:shadow"
            >
              <Card className="w-full gap-2 flex flex-col bg-transparent shadow-none border-none items-start text-start">
                <div className="w-full object-cover aspect-video relative rounded-md overflow-hidden shadow-md">
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
                <h3 className="font-bold group-hover:underline">
                  Lorem ipsum dolor sit amet.
                </h3>
                <p className="text-sm">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Corporis sapiente non ducimus ab.
                </p>
              </Card>
            </button>
          ))}
        </div>
      </section>
    </main>
  );
};

export default BTSVideosPage;
