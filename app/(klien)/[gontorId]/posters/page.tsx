import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import React from "react";
import Client from "./_components/client";
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
    title: `Posters-${meta}`,
  };
}

const BlogsPage = () => {
  return (
    <main className="bg-[#EBF0E5] font-revans w-screen min-h-screen h-auto relative">
      <Navbar isGontor />
      <Client />
      <Footer />
    </main>
  );
};

export default BlogsPage;
