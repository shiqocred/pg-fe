"use client";

import { Button } from "@/components/ui/button";
import { cn, mapCabang } from "@/lib/utils";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import { $Enums } from "@prisma/client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { Isi } from "./isi";

interface Props {
  id: string;
  cabang: $Enums.CabangRole | undefined;
  isAdmin: boolean;
}

export const Navigations = (props: Props) => {
  const [isMounted, setIsMounted] = useState(false);
  const { id, cabang, isAdmin } = props;
  const [isNavAdmin, setIsNavAdmin] = useState(false);
  const [navCabang, setNavCabang] = useState<string | undefined>("");

  const router = useRouter();

  const handleLogout = async () => {
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

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return;
  }
  return (
    <div className="h-full w-full flex flex-col justify-between">
      <Isi isAdmin={isNavAdmin} />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className="w-full bg-gray-300 hover:bg-gray-400 text-black capitalize justify-start">
            Hi,{" "}
            {navCabang === "ALL"
              ? "Admin"
              : mapCabang
                  .find((item) => item.value === cabang)
                  ?.label.split("-")
                  .join(" ")}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent side="right" sideOffset={30}>
          <DropdownMenuGroup>
            <DropdownMenuItem onSelect={handleLogout}>Logout</DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
