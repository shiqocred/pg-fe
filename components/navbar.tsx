import React from "react";
import { Button } from "./ui/button";
import { Menu } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export const Navbar = () => {
  return (
    <div className="w-full sticky top-0 left-0 h-16 bg-white/20 backdrop-blur-sm z-50 px-3 flex items-center justify-between shadow-sm">
      <Link href={"/"} className="flex gap-1 items-center">
        <div className="h-11 aspect-square relative">
          <Image src={"/images/main/9.webp"} alt="" fill />
        </div>
        <div className="h-7 aspect-[21/11] relative">
          <Image src={"/images/main/8.webp"} alt="" fill />
        </div>
      </Link>
      <Button
        variant={"outline"}
        size={"icon"}
        className="bg-transparent hover:bg-white/20 border-[#7B897F] text-[#7B897F] w-8 h-8"
      >
        <Menu className="h-4 w-4" />
      </Button>
    </div>
  );
};
