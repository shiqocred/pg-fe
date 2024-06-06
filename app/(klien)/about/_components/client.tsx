"use client";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Client = () => {
  return (
    <section className="w-full h-full object-cover overflow-hidden relative px-4 pt-5 font-avenir font-normal gap-4 flex flex-col pb-10">
      <div className="flex items-center">
        <Link href={`/`} className="mr-2">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="uppercase text-lg font-revans leading-none">
            About PG 699
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
              <BreadcrumbPage>About PG 699</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div>
        <div className="w-screen relative aspect-[64/119] -ml-4">
          <div className="w-full absolute h-10 z-10 bg-gradient-to-b from-[#EBF0E5] to-[#EBF0E5]/0 top-0" />
          <Image src={"/images/main/about.webp"} alt="about" fill />
        </div>
        <div className="text-sm gap-3 flex flex-col indent-5 leading-relaxed text-justify pt-5">
          <p>
            Pondok Modern Darussalam Gontor (PMDG) merupakan lembaga pendidikan
            Islam yang memberikan tujuan pendidikan mental dan karakter. Yang
            keduanya tersebut dilakukan melalui kegiatan-kegiatan dan aktivitas
            yang mendidik, dan selalu dijiwai dengan nilai-nilai dan filsafat
            hidup pondok pesantren, serta disampaikan dengan metode hikmah. Di
            samping kegiatan intrakurikuler, di PMDG juga terdapat kegiatan
            ekstrakurikuler; seperti olahraga, kesenian, keterampilan,
            keorganisasian, latihan pidato, praktik bahasa, kepramukaan, dan
            lain sebagainya.
          </p>
          <p>
            Dalam rangka pengenalan seluruh kegiatan pondok, maka PMDG
            mengadakan Pekan Perkenalan Khutbatu-l-‘Arsy yang dilaksanakan oleh
            para santri dengan bimbingan para guru, menampilkan seluruh
            aktivitas yang ada di dalam pondok dengan tujuan pengenalan dan
            penghayatan yang lebih mendalam terhadap keseluruhan dinamika
            kehidupan pondok.
          </p>
          <p>
            Salah satu dari sekian rentetan acara dalam Pekan Perkenalan
            Khutbatu-l-‘Arsy tersebut adalah Pagelaran Seni Panggung Gembira
            Siswa Kelas Akhir Kulliyyatu-l-Mu’allimin Al-Islamiyyah (KMI) Pondok
            Modern Darussalam Gontor Tahun Ajaran 1445–1446/2024–2025. Panggung
            Gembira merupakan sebuah pagelaran kreasi seni para santri yang
            ditata secara apik, menarik, serta dikelola secara total,
            profesional, dan berkaliber, hingga menghasilkan apresiasi seni
            budaya dengan tidak meninggalkan nilai-nilai Islam dan unsur
            pendidikan di dalamnya.
          </p>
        </div>
        <div className="pt-5 flex flex-col gap-1">
          <h3 className="font-bold text-xl">Nama Acara</h3>
          <p>
            Pagelaran Seni Akbar Panggung Gembira Siswa Kelas Akhir KMI 2025
          </p>
        </div>
        <div className="pt-5 flex flex-col gap-1">
          <h3 className="font-bold text-xl">Moto Acara</h3>
          <p>Wariskan Nilai-Nilai Islam, Wujudkan Peradaban Gemilang</p>
        </div>
        <div className="pt-5 flex flex-col gap-1">
          <h3 className="font-bold text-xl">Tujuan Acara</h3>
          <p>
            Mensyukuri nikmat dan anugerah Allah SWT atas kenaikan siswa kelas 5
            KMI ke kelas 6 KMI, sekaligus mendidik dan melatih santri dalam
            kepemimpinan, kemandirian, kerjasama, tanggung jawab, berpikir dan
            bekerja keras dalam berorganisasi. Memperkenalkan ragam kesenian di
            Pondok Modern Darussalam Gontor kepada santri baru, serta menggali
            dan meningkatkan potensi seluruh santri KMI melalui pagelaran seni
            yang menghibur dan mendidik, untuk mempererat ukhuwah Islamiyah di
            kalangan santri.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Client;
