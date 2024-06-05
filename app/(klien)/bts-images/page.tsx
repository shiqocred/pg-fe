import Client from "./_components/client";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Images",
};

const BTSImagesPage = () => {
  return (
    <main className="bg-[#EBF0E5] font-revans w-screen min-h-screen h-auto relative">
      <Navbar />
      <Client />
      <Footer />
    </main>
  );
};

export default BTSImagesPage;
