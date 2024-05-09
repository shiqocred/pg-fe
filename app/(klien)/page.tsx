import { CardPondok } from "@/components/card-pondok";
import { Navbar } from "@/components/navbar";
import Image from "next/image";
import React from "react";

const HomePage = () => {
  return (
    <main className="bg-[#EBF0E5] font-revans w-screen h-auto relative">
      <Navbar />
      <section className="w-full relative aspect-[16/38] -mt-16">
        <Image
          fill
          src={"/images/main/group_2.webp"}
          alt=""
          className="absolute w-full h-auto top-0 left-0"
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
              <Image fill src={"/images/main/10.webp"} alt="" />
            </div>
          </div>
          <div className="relative w-40 aspect-[8/11]">
            <Image fill src={"/images/main/10.webp"} alt="" />
          </div>
          <div className="absolute top-[115px]">
            <div className="relative w-56 aspect-[27/20]">
              <Image fill src={"/images/main/12.webp"} alt="" />
            </div>
          </div>
          <div className="absolute top-[250px]">
            <div className="relative w-[300px] aspect-[19/6]">
              <Image fill src={"/images/main/11.webp"} alt="" />
            </div>
          </div>
        </div>
      </section>
      <section className="w-screen relative overflow-x-hidden">
        <div className="w-full flex flex-col justify-center items-center mb-4">
          <p className="font-semibold text-[#7B897F] leading-none text-3xl">
            EXPLORE
          </p>
          <p className="font-semibold text-[#7B897F] leading-none text-3xl">
            MORE
          </p>
        </div>
        <div className="w-full px-3 pb-20 gap-4 flex flex-col">
          <CardPondok
            href="/gontor-1"
            image="/images/main/gontor1.webp"
            location="Gontor, Ponorogo, Jawa Timur"
            title="Pondok Modern Darussalam Gontor Putra Kampus Pusat"
          />
          <CardPondok
            href="/gontor-3"
            image="/images/main/gontor3.webp"
            location="Kediri, Jawa Timur"
            title="Pondok Modern Darussalam Gontor Putra Kampus 3 - DarulMa'rifat"
          />
          <CardPondok
            href="/gontor-4"
            image="/images/main/gontor4.webp"
            location="Banyuwangi, Jawa Timur"
            title="Pondok Modern Darussalam Gontor Putra Kampus 4 - Darul Muttaqien"
          />
          <CardPondok
            href="/gontor-5"
            image="/images/main/gontor5.webp"
            location="Magelang, Jawa Tengah"
            title="Pondok Modern Darussalam Gontor Putra Kampus 5 - Darul Qiyam"
          />
          <CardPondok
            href="/gontor-6"
            image="/images/main/gontor6.webp"
            location="Konawe Selatan, Sulawesi Tenggara"
            title="Pondok Modern Darussalam Gontor Putra Kampus 6 - Riyadhatul Mujahidin"
          />
          <CardPondok
            href="/gontor-7"
            image="/images/main/gontor7.webp"
            location="Kalianda, Lampung"
            title="Pondok Modern Darussalam Gontor Putra Kampus 7"
          />
          <CardPondok
            href="/gontor-putri-1"
            image="/images/main/gontorGp1.webp"
            location="Ngawi, Jawa Timur"
            title="Pondok Modern Darussalam Gontor Putri Kampus 1"
          />
          <CardPondok
            href="/gontor-putri-3"
            image="/images/main/gontorGp3.webp"
            location="Ngawi, Jawa Timur"
            title="Pondok Modern Darussalam Gontor Putri Kampus 3"
          />
          <CardPondok
            href="/gontor-putri-4"
            image="/images/main/gontorGp4.webp"
            location="Kediri, Jawa Timur"
            title="Pondok Modern Darussalam Gontor Putri Kampus 4"
          />
          <CardPondok
            href="/gontor-putri-7"
            image="/images/main/gontorGp7.webp"
            location="Kampar, Riau"
            title="Pondok Modern Darussalam Gontor Putri Kampus 7"
          />
        </div>
      </section>
    </main>
  );
};

export default HomePage;
