import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import React from "react";
import { Metadata } from "next";
import Client from "./_components/client";

export const metadata: Metadata = {
  title: "About",
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
