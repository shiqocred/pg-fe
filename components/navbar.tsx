"use client";

import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import {
  Check,
  ChevronDown,
  Home,
  ImageIcon,
  Images,
  Menu,
  MonitorPlay,
  Newspaper,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { cn, mapCabang } from "@/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Command, CommandGroup, CommandItem, CommandList } from "./ui/command";
import { useParams, usePathname, useRouter } from "next/navigation";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";

export const Navbar = ({ isGontor }: { isGontor?: boolean }) => {
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const { gontorId } = useParams();
  const pathname = usePathname();

  const menuMap = [
    {
      label: "Blog",
      href: isGontor ? `/${gontorId}/blogs` : "/blogs",
      icon: Newspaper,
    },
    {
      label: "Video",
      href: isGontor ? `/${gontorId}/bts-videos` : "/bts-videos",
      icon: MonitorPlay,
    },
    {
      label: "Photo",
      href: isGontor ? `/${gontorId}/bts-images` : "/bts-images",
      icon: ImageIcon,
    },
    {
      label: "Poster",
      href: isGontor ? `/${gontorId}/posters` : "/posters",
      icon: Images,
    },
  ];

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
              {mapCabang.find((item) => item.label === gontorId)?.kampus}
              <ChevronDown className="w-4 h-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="p-0 " sideOffset={25}>
            <Command className="bg-[#EBF0E5]">
              <CommandGroup>
                <CommandList className="max-h-[360px]">
                  {mapCabang.map((item) => (
                    <CommandItem
                      key={item.value}
                      onSelect={() => router.push(`/${item.label}`)}
                      className="aria-selected:bg-[#b8c2aa]"
                      aria-selected={item.value === gontorId}
                    >
                      <Check
                        className={
                          (cn("w-4 h-4 mr-2"),
                          item.label === gontorId ? "opacity-100" : "opacity-0")
                        }
                      />
                      {item.kampus}
                    </CommandItem>
                  ))}
                </CommandList>
              </CommandGroup>
            </Command>
          </PopoverContent>
        </Popover>
      )}
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button
            variant={"outline"}
            size={"icon"}
            className="bg-transparent hover:bg-white/20 border-[#7B897F] text-[#7B897F] w-8 h-8 flex-none"
          >
            <Menu className="h-4 w-4" />
          </Button>
        </SheetTrigger>
        <SheetContent className="bg-[#EBF0E5]">
          <SheetHeader className="text-start">
            <SheetTitle>Navigation</SheetTitle>
          </SheetHeader>
          <div className="py-10 h-full flex flex-col justify-between">
            <ul className="w-full flex flex-col gap-y-2">
              <li>
                <Link href={isGontor ? `/${gontorId}` : "/"}>
                  <Button
                    className={cn(
                      "w-full hover:bg-[#7B897F]/50 bg-transparent justify-start",
                      (isGontor
                        ? pathname === `/${gontorId}`
                        : pathname === "/") &&
                        "bg-[#7B897F] hover:bg-[#7B897F]/80 text-[#EBF0E5]"
                    )}
                    variant={"ghost"}
                    onClick={() => setIsOpen(false)}
                  >
                    <Home className="h-4 w-4 mr-2" />
                    Beranda
                  </Button>
                </Link>
              </li>
              {menuMap.map((item) => (
                <li key={item.label}>
                  <Link href={item.href}>
                    <Button
                      className={cn(
                        "w-full hover:bg-[#7B897F]/50 bg-transparent justify-start",
                        pathname.includes(item.href) &&
                          "bg-[#7B897F] hover:bg-[#7B897F]/80 text-[#EBF0E5]"
                      )}
                      variant={"ghost"}
                      onClick={() => setIsOpen(false)}
                    >
                      <item.icon className="h-4 w-4 mr-2" />
                      {item.label}
                    </Button>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};
