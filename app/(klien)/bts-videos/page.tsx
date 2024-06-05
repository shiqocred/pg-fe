import { Navbar } from "@/components/navbar";
import React from "react";
import { Footer } from "@/components/footer";
import Client from "./_components/client";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Videos",
};

const BTSVideosPage = () => {
  return (
    <main className="bg-[#EBF0E5] font-revans w-screen min-h-screen h-auto relative">
      <Navbar />
      <Client />
      <Footer />
    </main>
  );
};

export default BTSVideosPage;
