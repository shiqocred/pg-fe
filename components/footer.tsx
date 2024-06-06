"use client";

import Image from "next/image";
import React from "react";
import Link from "next/link";
import { useParams } from "next/navigation";

export const Footer = ({ isGontorId = false }: { isGontorId?: boolean }) => {
  const { gontorId } = useParams();
  return (
    <section className="w-screen relative overflow-x-hidden pt-10 px-3 font-avenir ">
      <div className="flex w-full items-center">
        <div className="w-[60px] relative aspect-square">
          <Image
            src={"/images/main/10.webp"}
            alt=""
            fill
            className="object-contain"
          />
        </div>
        <div className="h-[40px] relative w-[120px]">
          <Image
            src={"/images/main/11.webp"}
            alt=""
            fill
            className="object-contain"
          />
        </div>
      </div>
      <p className="mt-3 text-sm leading-relaxed">
        Pagelaran Seni Panggung Gembira Siswa Kelas Akhir
        Kulliyyatul-Mu&apos;allimin Al-Islamiyyah (KMI) Pondok Modern Darussalam
        Gontor ini berbentuk pementasan seni dan budaya di atas panggung yang
        dikemas dalam empat unsur, yaitu: Educating, Entertaining, Elegant, dan
        Enjoyable
      </p>
      <div className="flex mt-3 h-full">
        <div className="w-full border-r border-black pr-2 mr-2 gap-3 flex flex-col">
          <div className="flex flex-col gap-2">
            <h5 className="font-bold">Alamat</h5>
            <p className="text-sm">
              Putra I, Gontor 1, Gontor, Kec. Ponorogo, Kabupaten Ponorogo, Jawa
              Timur 63472
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <h5 className="font-bold">Hubungi Kami</h5>
            <p className="text-sm">Kampus Pusat : 085334377661</p>
          </div>
        </div>
        <div className="w-full flex flex-col gap-2 text-sm">
          <h3 className="font-bold text-base">Menu</h3>
          <Link href={isGontorId ? `/${gontorId}` : "/"}>Beranda</Link>
          <Link href={isGontorId ? `/${gontorId}/blogs` : "/blogs"}>News</Link>
          <Link href={isGontorId ? `/${gontorId}/bts-videos` : "/bts-videos"}>
            BTS Video
          </Link>
          <Link href={isGontorId ? `/${gontorId}/bts-photos` : "/bts-photos"}>
            BTS Photos
          </Link>
          <Link href={isGontorId ? `/${gontorId}/posters` : "/posters"}>
            Poster
          </Link>
        </div>
      </div>
      <div className="py-10 mt-5 border-t border-black flex flex-col gap-2 justify-center items-center text-sm w-full text-center">
        <p>Copyright © 2024 Panggung Gembira | Commited Generation</p>
        <p>
          Powered by{" "}
          <Link
            href="https://gontor.ac.id"
            target="_blank"
            className="hover:underline"
          >
            Gontor
          </Link>{" "}
          & Fordev_Guardian
        </p>
      </div>
    </section>
  );
};
