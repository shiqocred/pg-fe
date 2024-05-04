import { Card } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const HomePage = () => {
  return (
    <main className="bg-[#EBF0E5] font-avenir">
      <section className="w-screen h-[100svh] relative">
        <div className="absolute top-0 left-0 w-screen h-[100lvh]  flex justify-center">
          <Image
            src={"/images/main/group_2.webp"}
            alt=""
            className="absolute w-full h-auto top-0 left-0"
            priority
          />
        </div>
      </section>
      <section className="w-screen h-[55vh] relative overflow-hidden ">
        <div className="w-full flex justify-center items-center">
          <p className="font-bold text-[#7B897F] text-lg">Presented by</p>
        </div>
        <div className="w-full flex justify-center items-center mt-5 relative">
          <Image
            src={"/images/main/10.webp"}
            alt=""
            className="absolute -left-[130px] -top-5 w-[300px] opacity-20"
          />
          <div className="relative w-40 h-auto">
            <Image src={"/images/main/10.webp"} alt="" />
          </div>
          <Image
            src={"/images/main/12.webp"}
            alt=""
            className="absolute w-56 mr-2 top-[115px]"
          />
          <Image
            src={"/images/main/11.webp"}
            alt=""
            className="absolute w-[300px] top-[250px]"
          />
        </div>
      </section>
      <section className="w-screen relative overflow-x-hidden">
        <div className="w-full flex flex-col justify-center items-center mb-4">
          <p className="font-semibold text-[#7B897F] leading-none text-xl">
            EXPLORE
          </p>
          <p className="font-semibold text-[#7B897F] leading-none text-xl">
            MORE
          </p>
        </div>
        <div className="w-full px-2 pb-20 gap-4 flex flex-col">
          <Link href={"#"}>
            <Card className="w-full gap-2 flex flex-col overflow-hidden rounded-md shadow p-2 border bg-transparent border-gray-300">
              <div className="w-full relatif aspect-video relative  rounded-md overflow-hidden shadow-md">
                <Image src={"/images/main/gontor1.webp"} alt="" fill />
              </div>
              <div>
                <h2 className="font-bold text-xs hover:underline">
                  Pondok Modern Darussalam Gontor
                </h2>
                <p className="text-[10px]">Gontor, Ponorogo, Jawa Timur</p>
              </div>
            </Card>
          </Link>
          <Link href={"#"}>
            <Card className="w-full gap-2 flex flex-col overflow-hidden rounded-md shadow p-2 border bg-transparent border-gray-300">
              <div className="w-full relatif aspect-video relative  rounded-md overflow-hidden shadow-md">
                <Image src={`/images/main/gontor3.webp`} alt="" fill />
              </div>
              <div>
                <h2 className="font-bold text-xs hover:underline">
                  Pondok Modern Darul Ma&apos;rifat Kampus 3
                </h2>
                <p className="text-[10px]">Kediri, Jawa Timur</p>
              </div>
            </Card>
          </Link>
          <Link href={"#"}>
            <Card className="w-full gap-2 flex flex-col overflow-hidden rounded-md shadow p-2 border bg-transparent border-gray-300">
              <div className="w-full relatif aspect-video relative  rounded-md overflow-hidden shadow-md">
                <Image src={"/images/main/gontor4.webp"} alt="" fill />
              </div>
              <div>
                <h2 className="font-bold text-xs hover:underline">
                  Pondok Modern Darul Mutaqin Kampus 4
                </h2>
                <p className="text-[10px]">Banyuwangi, Jawa Timur</p>
              </div>
            </Card>
          </Link>
          <Link href={"#"}>
            <Card className="w-full gap-2 flex flex-col overflow-hidden rounded-md shadow p-2 border bg-transparent border-gray-300">
              <div className="w-full relatif aspect-video relative  rounded-md overflow-hidden shadow-md">
                <Image src={"/images/main/gontor1.webp"} alt="" fill />
              </div>
              <div>
                <h2 className="font-bold text-xs hover:underline">
                  Pondok Modern Darussalam Gontor
                </h2>
                <p className="text-[10px]">Gontor, Ponorogo, Jawa Timur</p>
              </div>
            </Card>
          </Link>
          <Link href={"#"}>
            <Card className="w-full gap-2 flex flex-col overflow-hidden rounded-md shadow p-2 border bg-transparent border-gray-300">
              <div className="w-full relatif aspect-video relative  rounded-md overflow-hidden shadow-md">
                <Image src={"/images/main/gontor1.webp"} alt="" fill />
              </div>
              <div>
                <h2 className="font-bold text-xs hover:underline">
                  Pondok Modern Darussalam Gontor
                </h2>
                <p className="text-[10px]">Gontor, Ponorogo, Jawa Timur</p>
              </div>
            </Card>
          </Link>
          <Link href={"#"}>
            <Card className="w-full gap-2 flex flex-col overflow-hidden rounded-md shadow p-2 border bg-transparent border-gray-300">
              <div className="w-full relatif aspect-video relative  rounded-md overflow-hidden shadow-md">
                <Image src={"/images/main/gontor1.webp"} alt="" fill />
              </div>
              <div>
                <h2 className="font-bold text-xs hover:underline">
                  Pondok Modern Darussalam Gontor
                </h2>
                <p className="text-[10px]">Gontor, Ponorogo, Jawa Timur</p>
              </div>
            </Card>
          </Link>
        </div>
      </section>
    </main>
  );
};

export default HomePage;
