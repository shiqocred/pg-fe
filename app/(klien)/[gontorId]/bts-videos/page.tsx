import { Footer } from "@/components/footer";
import Client from "./_components/client";
import { Navbar } from "@/components/navbar";
import React from "react";
import { Metadata, ResolvingMetadata } from "next";
import { mapCabang } from "@/lib/utils";

type Props = {
  params: { gontorId: string };
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const meta =
    mapCabang.find((item) => item.label === params.gontorId)?.kampus ?? "";

  return {
    title: `Videos-${meta}`,
  };
}

const BTSVideosPage = () => {
  return (
    <main className="bg-[#EBF0E5] font-revans w-screen min-h-screen h-auto relative">
      <Navbar isGontor />
      <Client />
      <Footer isGontorId />
    </main>
  );
};

export default BTSVideosPage;
