"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  CircleFadingPlus,
  Trash2,
  PlusCircle,
  Search,
  DatabaseBackup,
  SquareArrowOutUpRight,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import { SponsorshipsProps } from "../page";
import { useModal } from "@/hooks/use-modal";

export const SponsorClient = ({ data }: { data: SponsorshipsProps[] }) => {
  const [isMounted, setIsMounted] = useState(false);
  const { onOpen } = useModal();

  useEffect(() => {
    setIsMounted(true);
  }, [data]);

  if (!isMounted) {
    return null;
  }
  return (
    <div>
      <div className="flex w-full justify-between items-center mb-3 flex-col md:flex-row gap-3">
        <div className="flex gap-3 w-full items-center">
          <div className="max-w-lg relative w-full">
            <Search className="absolute top-2.5 left-3 w-4 h-4" />
            <Input
              className="pl-10 h-9 focus-visible:ring-1 focus-visible:ring-offset-0 border-gray-400"
              autoFocus
            />
          </div>
          <Button
            variant={"outline"}
            className="h-9 border-gray-400 border-dashed hover:bg-gray-200 hidden md:flex"
          >
            <CircleFadingPlus className="h-4 w-4 mr-2" />
            Status
          </Button>
        </div>
        <div className="flex items-center gap-3 w-full md:w-auto">
          <Button
            variant={"outline"}
            className="h-9 border-gray-400 border-dashed hover:bg-gray-200 md:hidden"
          >
            <CircleFadingPlus className="h-4 w-4 mr-2" />
            Position
          </Button>
          <Link href="/admin/sponsorships/create" className="w-full md:w-auto">
            <Button className="h-9 w-full md:w-auto">
              <PlusCircle className="w-4 h-4 mr-2" />
              Add Sponsor
            </Button>
          </Link>
        </div>
      </div>
      {data.length !== 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 p-3 rounded-lg border">
          {data.map((item) => (
            <Card key={item.id} className="col-span-1 w-full flex flex-col">
              <div className="flex flex-col px-2 gap-4 py-2">
                <div className="relative w-full aspect-square rounded overflow-hidden shadow">
                  <Image
                    src={item.imageUrl ?? "/images/main_image.jpg"}
                    alt=""
                    fill
                    className="object-cover"
                  />
                </div>
                <p className="border-l-4 pl-3 py-1 border-gray-300 bg-gray-100 w-full md:w-44 capitalize text-xs whitespace-nowrap">
                  {item.position === "UTAMA" && "Sponsor utama"}
                  {item.position === "TUNGGAL" && "Sponsor tunggal"}
                  {item.position === "PENDAMPING1" && "Sponsor pendamping 1"}
                  {item.position === "PENDAMPING2" && "Sponsor pendamping 2"}
                  {item.position === "PENDAMPING3" && "Sponsor pendamping 3"}
                </p>
                <div className="flex flex-col gap-1">
                  <h5 className="line-clamp-2 font-semibold capitalize leading-tight">
                    {item.name}
                  </h5>
                  <Link
                    href={item.href ?? "#"}
                    target="_blank"
                    className="whitespace-nowrap font-light text-xs hover:underline leading-tight flex items-center text-gray-600"
                  >
                    {item.href}
                    <SquareArrowOutUpRight className="w-2 h-2 ml-1" />
                  </Link>
                </div>
                <div className="flex w-full items-center text-xs text-gray-400 gap-2 capitalize">
                  <p>{item.date}</p>
                  <p>-</p>
                  <p>{item.cabang}</p>
                </div>
              </div>
              <div className="flex items-center border-t py-2 px-2 w-full gap-2">
                <Link
                  href={`/admin/sponsorships/${item.id}`}
                  className="w-full"
                >
                  <Button className="w-full">Edit</Button>
                </Link>
                <Button
                  size={"icon"}
                  variant={"destructive"}
                  className="flex-none"
                  onClick={() => onOpen("delete-sponsorship", item.id)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <div className="flex items-center justify-center p-3 rounded-lg border min-h-[200px]">
          <div className="flex flex-col items-center gap-3">
            <DatabaseBackup className="w-20 h-20 stroke-[1.5]" />
            <p className="font-semibold">No sponsor listed.</p>
          </div>
        </div>
      )}
    </div>
  );
};
