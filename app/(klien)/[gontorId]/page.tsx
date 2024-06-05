import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
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
    title: meta,
  };
}

const GontorIdPage = () => {
  return (
    <main className="bg-[#EBF0E5] font-revans w-screen h-auto relative">
      <Navbar isGontor />
      <Client />
      <Footer />
    </main>
  );
};

export default GontorIdPage;
