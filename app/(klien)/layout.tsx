import Image from "next/image";

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="bg-[#EBF0E5]">
      <div className="flex md:hidden">{children}</div>
      <div className="hidden md:flex items-center justify-center w-screen h-screen">
        <div className="w-[50vw] relative aspect-square">
          <Image
            src={"/images/main/undermaintenance.webp"}
            alt="undermaintenance"
            fill
            className="object-contain"
          />
        </div>
      </div>
    </div>
  );
}
