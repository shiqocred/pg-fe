"use client";

import React, { MouseEvent, useEffect, useState } from "react";
import { $Enums } from "@prisma/client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Isi } from "./isi";
import { mapCabang } from "@/lib/utils";
import axios from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface Props {
  id: string;
  cabang: $Enums.CabangRole | undefined;
  isAdmin: boolean;
}

export const Navbar = (props: Props) => {
  const { id, cabang, isAdmin } = props;
  const [isOpen, setIsOpen] = useState(false);
  const [isNavAdmin, setIsNavAdmin] = useState(false);
  const [navCabang, setNavCabang] = useState<string | undefined>("");
  const router = useRouter();
  const handleLogout = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      await axios.post("/api/auth/logout", {});
      router.push("/login");
      toast.success("Logout berhasil");
    } catch (error) {
      console.log("ERROR_LOGOUT", error);
      toast.success("Logout gagal");
    }
  };

  useEffect(() => {
    setIsNavAdmin(isAdmin);
    setNavCabang(cabang);
  }, [isAdmin, cabang]);
  return (
    <div className="w-full sticky top-0 left-0 h-16 bg-white/20 backdrop-blur-sm z-50 px-3 flex items-center justify-between shadow-sm gap-5 lg:hidden">
      <Link
        href={"/admin/dashboard"}
        className="flex font-bold items-center uppercase"
      >
        Admin{" "}
        {navCabang === "ALL"
          ? "Admin"
          : mapCabang
              .find((item) => item.value === cabang)
              ?.label.split("-")
              .join(" ")}
      </Link>
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
        <SheetContent className="p-3">
          <SheetHeader className="text-start">
            <SheetTitle>Navigation</SheetTitle>
          </SheetHeader>
          <div className="py-10 h-full flex flex-col justify-between">
            <Isi isAdmin={isNavAdmin} onSelect={setIsOpen} />
            <Button onClick={handleLogout}>Logout</Button>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};
