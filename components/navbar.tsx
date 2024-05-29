"use client";

import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Check, ChevronDown, Menu } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Command, CommandGroup, CommandItem, CommandList } from "./ui/command";
import { useParams, useRouter } from "next/navigation";

const mapGontor = [
  {
    label: "Kampus Putra 1",
    value: "gontor-1",
  },
  {
    label: "Kampus Putra 3",
    value: "gontor-3",
  },
  {
    label: "Kampus Putra 4",
    value: "gontor-4",
  },
  {
    label: "Kampus Putra 5",
    value: "gontor-5",
  },
  {
    label: "Kampus Putra 6",
    value: "gontor-6",
  },
  {
    label: "Kampus Putra 7",
    value: "gontor-7",
  },
  {
    label: "Kampus Putri 1",
    value: "gontor-putri-1",
  },
  {
    label: "Kampus Putri 3",
    value: "gontor-putri-3",
  },
  {
    label: "Kampus Putri 4",
    value: "gontor-putri-4",
  },
  {
    label: "Kampus Putri 7",
    value: "gontor-putri-7",
  },
];

export const Navbar = ({ isGontor }: { isGontor?: boolean }) => {
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();
  const { gontorId } = useParams();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return;
  }
  return (
    <div className="w-full sticky top-0 left-0 h-16 bg-white/20 backdrop-blur-sm z-50 px-3 flex items-center justify-between shadow-sm gap-5">
      <Link href={"/"} className="flex gap-1 items-center">
        <div className="h-11 aspect-square relative">
          <Image src={"/images/main/9.webp"} alt="" fill />
        </div>
        <div
          className={cn("h-7 aspect-[21/11] relative", isGontor && "hidden")}
        >
          <Image src={"/images/main/8.webp"} alt="" fill />
        </div>
      </Link>
      {isGontor && (
        <Popover>
          <PopoverTrigger asChild>
            <Button className="w-full h-8 bg-[#7B897F] hover:bg-[#7B897F]/80 justify-between">
              {mapGontor.find((item) => item.value === gontorId)?.label}
              <ChevronDown className="w-4 h-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="p-0 " sideOffset={25}>
            <Command className="bg-[#EBF0E5]">
              <CommandGroup>
                <CommandList className="max-h-[360px]">
                  {mapGontor.map((item) => (
                    <CommandItem
                      key={item.value}
                      onSelect={() => router.push(`/${item.value}`)}
                      className="aria-selected:bg-[#b8c2aa]"
                      aria-selected={item.value === gontorId}
                    >
                      <Check
                        className={
                          (cn("w-4 h-4 mr-2"),
                          item.value === gontorId ? "opacity-100" : "opacity-0")
                        }
                      />
                      {item.label}
                    </CommandItem>
                  ))}
                </CommandList>
              </CommandGroup>
            </Command>
          </PopoverContent>
        </Popover>
      )}
      <Button
        variant={"outline"}
        size={"icon"}
        className="bg-transparent hover:bg-white/20 border-[#7B897F] text-[#7B897F] w-8 h-8 flex-none"
      >
        <Menu className="h-4 w-4" />
      </Button>
    </div>
  );
};
