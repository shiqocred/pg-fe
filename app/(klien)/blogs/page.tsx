import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import React from "react";
import Client from "./_components/client";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "News",
};

const BlogsPage = () => {
  return (
    <main className="bg-[#EBF0E5] font-revans w-screen min-h-screen h-auto relative">
      <Navbar />
      <Client />
      <Footer />
    </main>
  );
};

export default BlogsPage;
