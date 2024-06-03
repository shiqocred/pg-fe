import Link from "next/link";
import React from "react";
import { Card } from "./ui/card";
import Image from "next/image";
import { LocateFixed } from "lucide-react";

interface CardPondokProps {
  title: string;
  href: string;
  image: string;
  location: string;
}

export const CardPondok = ({
  title,
  href,
  image,
  location,
}: CardPondokProps) => {
  return (
    <Link href={href}>
      <Card className="group h-full w-full gap-3 flex flex-col overflow-hidden rounded-md shadow border bg-transparent border-gray-300 font-avenir">
        <div className="w-full relatif object-cover aspect-video relative overflow-hidden flex-none">
          <Image
            className="object-cover pointer-events-none"
            src={image}
            alt=""
            fill
          />
        </div>
        <div className="flex flex-col w-full gap-2 h-full justify-between px-1.5 pb-1.5">
          <h2 className="font-bold text-sm group-hover:underline">{title}</h2>
          <p className="text-xs text-gray-500 flex items-center gap-1 leading-none">
            <LocateFixed className="w-[10px] h-[10px] mb-0.5" />
            {location}
          </p>
        </div>
      </Card>
    </Link>
  );
};
