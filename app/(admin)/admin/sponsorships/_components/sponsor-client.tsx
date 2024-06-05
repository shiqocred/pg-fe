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
  X,
  XCircle,
  RotateCcw,
  ChevronLeft,
  ChevronRight,
  Loader2,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import { SponsorshipsProps } from "../page";
import { useModal } from "@/hooks/use-modal";
import axios from "axios";
import { useDebounce } from "@/hooks/use-debounce";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { formatDistanceStrict } from "date-fns";
import { id as indonesia } from "date-fns/locale";
import { useCookies } from "next-client-cookies";
import { mapCabang } from "@/lib/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

export const SponsorClient = ({ isAdmin }: { isAdmin: boolean }) => {
  const [isMounted, setIsMounted] = useState(false);
  const [isLoading, setIsloading] = useState(false);
  const [sponsorships, setSponsorships] = useState<SponsorshipsProps[]>([]);
  const [isUserAdmin, setIsUserAdmin] = useState(false);
  const [search, setSearch] = useState("");
  const searchValue = useDebounce(search);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [position, setPosition] = useState("");
  const [cabang, setCabang] = useState("");
  const cookies = useCookies();
  const { onOpen } = useModal();

  const handleGetSponsorships = async () => {
    setIsloading(true);
    try {
      const res = await axios.get(
        `/api/admin/sponsorships?p=${page}&q=${searchValue}&ps=${position}&c=${cabang}`
      );
      const data = res.data.data.data;
      const formatedBlogs: SponsorshipsProps[] = data.map((item: any) => ({
        id: item.id,
        name: item.name,
        imageUrl: item.imageUrl,
        href: item.href,
        position: item.position,
        cabang:
          mapCabang
            .find((i) => i.value === item.profile.cabang)
            ?.label.split("-")
            .join(" ") ?? item.profile.cabang,
        date: formatDistanceStrict(
          item.createdAt.toString(),
          new Date().toString(),
          {
            addSuffix: true,
            locale: indonesia,
          }
        ),
      }));
      setSponsorships(formatedBlogs);
      setTotalPage(res.data.data.last_page);
    } catch (error) {
      console.log(["ERROR_GET_SPONSORSHIPS:"], error);
    } finally {
      setIsloading(false);
    }
  };

  useEffect(() => {
    handleGetSponsorships();
    if (cookies.get("updated")) {
      cookies.remove("updated");
    }
  }, [position, page, searchValue, cabang, cookies.get("updated")]);

  useEffect(() => {
    setIsMounted(true);
    handleGetSponsorships();
    setIsUserAdmin(isAdmin);
  }, []);

  if (!isMounted) {
    return null;
  }
  return (
    <div>
      <div className="flex w-full md:justify-between xl:items-center mb-3 flex-col justify-start md:flex-row gap-3">
        <div className="flex gap-3 w-full xl:items-center xl:flex-row flex-col">
          <div className="max-w-lg relative w-full">
            <Search className="absolute top-2.5 left-3 w-4 h-4" />
            {search && (
              <Button
                className="p-0 h-6 w-6 absolute right-2 top-1.5"
                type="button"
                onClick={() => setSearch("")}
                variant={"ghost"}
              >
                <X className="w-4 h-4" />
              </Button>
            )}
            <Input
              className="pl-10 h-9 focus-visible:ring-1 focus-visible:ring-offset-0 border-gray-400"
              onChange={(e) => setSearch(e.target.value)}
              value={search}
              disabled={isLoading}
            />
          </div>
          <div className="flex items-center gap-3 w-full overflow-x-scroll md:w-auto md:overflow-x-visible">
            {isUserAdmin && (
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className="h-9 border-gray-400 border-dashed hover:bg-gray-200 flex px-3"
                    disabled={isLoading}
                  >
                    <CircleFadingPlus className="h-4 w-4 mr-2" />
                    Kampus
                    {cabang && (
                      <Separator
                        orientation="vertical"
                        className="mx-2 bg-gray-500 w-[1.5px]"
                      />
                    )}
                    {cabang && (
                      <Badge className="rounded bg-gray-200 hover:bg-gray-200 text-black font-normal capitalize">
                        {mapCabang
                          .find((item) => item.value === cabang)
                          ?.label.split("-")
                          .join(" ")}
                      </Badge>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="p-0 w-40" align="start">
                  <Command>
                    <CommandGroup>
                      <CommandList>
                        {mapCabang.map((item) => (
                          <CommandItem
                            key={item.value}
                            onSelect={() =>
                              cabang === item.value
                                ? setCabang("")
                                : setCabang(item.value)
                            }
                          >
                            <Checkbox
                              className="w-4 h-4 mr-2"
                              checked={cabang === item.value}
                              onCheckedChange={() =>
                                cabang === item.value
                                  ? setCabang("")
                                  : setCabang(item.value)
                              }
                            />
                            {item.label.split("-").join(" ")}
                          </CommandItem>
                        ))}
                      </CommandList>
                    </CommandGroup>
                  </Command>
                </PopoverContent>
              </Popover>
            )}

            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className="h-9 border-gray-400 border-dashed hover:bg-gray-200 flex px-3"
                  disabled={isLoading}
                >
                  <CircleFadingPlus className="h-4 w-4 mr-2" />
                  Jenis
                  {position && (
                    <Separator
                      orientation="vertical"
                      className="mx-2 bg-gray-500 w-[1.5px]"
                    />
                  )}
                  {position && (
                    <Badge className="rounded bg-gray-200 hover:bg-gray-200 text-black font-normal capitalize">
                      {position === "UTAMA" && "Sponsor utama"}
                      {position === "TUNGGAL" && "Sponsor tunggal"}
                      {position === "PENDAMPING1" && "Sponsor pendamping 1"}
                      {position === "PENDAMPING2" && "Sponsor pendamping 2"}
                      {position === "PENDAMPING3" && "Sponsor pendamping 3"}
                    </Badge>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="p-0 w-52" align="start">
                <Command>
                  <CommandGroup>
                    <CommandList>
                      <CommandItem onSelect={() => setPosition("UTAMA")}>
                        <Checkbox
                          className="w-4 h-4 mr-2"
                          checked={position === "UTAMA"}
                          onCheckedChange={() => setPosition("UTAMA")}
                        />
                        Sponsor utama
                      </CommandItem>
                      <CommandItem onSelect={() => setPosition("TUNGGAL")}>
                        <Checkbox
                          className="w-4 h-4 mr-2"
                          checked={position === "TUNGGAL"}
                          onCheckedChange={() => setPosition("TUNGGAL")}
                        />
                        Sponsor tunggal
                      </CommandItem>
                      <CommandItem onSelect={() => setPosition("PENDAMPING1")}>
                        <Checkbox
                          className="w-4 h-4 mr-2"
                          checked={position === "PENDAMPING1"}
                          onCheckedChange={() => setPosition("PENDAMPING1")}
                        />
                        Sponsor pendamping 1
                      </CommandItem>
                      <CommandItem onSelect={() => setPosition("PENDAMPING2")}>
                        <Checkbox
                          className="w-4 h-4 mr-2"
                          checked={position === "PENDAMPING2"}
                          onCheckedChange={() => setPosition("PENDAMPING2")}
                        />
                        Sponsor pendamping 2
                      </CommandItem>
                      <CommandItem onSelect={() => setPosition("PENDAMPING3")}>
                        <Checkbox
                          className="w-4 h-4 mr-2"
                          checked={position === "PENDAMPING3"}
                          onCheckedChange={() => setPosition("PENDAMPING3")}
                        />
                        Sponsor pendamping 3
                      </CommandItem>
                    </CommandList>
                  </CommandGroup>
                </Command>
              </PopoverContent>
            </Popover>
            {(position || cabang) && (
              <Button
                variant={"ghost"}
                className="h-9 flex px-3"
                onClick={() => {
                  setCabang("");
                  setPosition("");
                }}
              >
                Reset
                <XCircle className="h-4 w-4 ml-2" />
              </Button>
            )}
          </div>
        </div>
        <div className="flex gap-2">
          <Button
            className="p-0 h-9 w-9 border-gray-500"
            variant={"outline"}
            onClick={() => cookies.set("updated", "updated")}
            disabled={isLoading}
          >
            <RotateCcw className="w-4 h-4" />
          </Button>
          <Link href="/admin/sponsorships/create" className="w-full md:w-auto">
            <Button className="h-9 w-full md:w-auto" disabled={isLoading}>
              <PlusCircle className="w-4 h-4 mr-2" />
              Add Sponsor
            </Button>
          </Link>
        </div>
      </div>
      {sponsorships.length !== 0 ? (
        <div className="flex flex-col gap-3">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 p-3 rounded-lg border relative">
            {isLoading && (
              <div className="w-full h-full absolute bg-gray-500/20 backdrop-blur-sm top-0 left-0 z-10 flex items-center justify-center rounded-md">
                <Loader2 className="w-10 h-10 animate-spin text-gray-700 dark:text-white" />
              </div>
            )}
            {sponsorships.map((item) => (
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
          <div className="flex gap-5 ml-auto items-center">
            <p className="text-sm">
              Page {page} of {totalPage}
            </p>
            <div className="flex items-center gap-2">
              <Button
                className="p-0 h-8 w-8"
                disabled={page === 1}
                onClick={() => setPage((prev) => prev - 1)}
              >
                <ChevronLeft className="w-5 h-5" />
              </Button>
              <Button
                className="p-0 h-8 w-8"
                disabled={page === totalPage}
                onClick={() => setPage((prev) => prev + 1)}
              >
                <ChevronRight className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center p-3 rounded-lg border min-h-[200px] relative">
          {isLoading && (
            <div className="w-full h-full absolute bg-gray-500/20 backdrop-blur-sm top-0 left-0 z-10 flex items-center justify-center rounded-md">
              <Loader2 className="w-10 h-10 animate-spin text-gray-700 dark:text-white" />
            </div>
          )}
          <div className="flex flex-col items-center gap-3">
            <DatabaseBackup className="w-20 h-20 stroke-[1.5]" />
            <p className="font-semibold">No sponsor listed.</p>
          </div>
        </div>
      )}
    </div>
  );
};
