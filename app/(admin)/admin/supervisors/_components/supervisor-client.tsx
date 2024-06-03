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
  X,
  ChevronLeft,
  ChevronRight,
  RotateCcw,
  XCircle,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import { SupervisorsProps } from "../page";
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

export const SupervisorClient = ({ isAdmin }: { isAdmin: boolean }) => {
  const [isMounted, setIsMounted] = useState(false);
  const [supervisors, setSupervisors] = useState<SupervisorsProps[]>([]);
  const [isUserAdmin, setIsUserAdmin] = useState(false);
  const [search, setSearch] = useState("");
  const searchValue = useDebounce(search);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [position, setPosition] = useState("");
  const [cabang, setCabang] = useState("");
  const cookies = useCookies();
  const { onOpen } = useModal();

  const handleGetSupervisors = async () => {
    try {
      const res = await axios.get(
        `/api/admin/supervisors?p=${page}&q=${searchValue}&ps=${position}&c=${cabang}`
      );
      const data = res.data.data.data;
      const formatedSupervisors: SupervisorsProps[] = data.map((item: any) => ({
        id: item.id,
        name: item.name,
        imageUrl: item.imageUrl,
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
      setSupervisors(formatedSupervisors);
      setTotalPage(res.data.data.last_page);
    } catch (error) {
      console.log(["ERROR_GET_SUPERVISORS:"], error);
    }
  };

  useEffect(() => {
    handleGetSupervisors();
    if (cookies.get("updated")) {
      cookies.remove("updated");
    }
  }, [position, page, searchValue, cabang, cookies.get("updated")]);

  useEffect(() => {
    setIsMounted(true);
    handleGetSupervisors();
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
            />
          </div>
          <div className="flex items-center gap-3 w-full overflow-x-scroll md:w-auto md:overflow-x-visible">
            {isUserAdmin && (
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className="h-9 border-gray-400 border-dashed hover:bg-gray-200 flex px-3"
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
                >
                  <CircleFadingPlus className="h-4 w-4 mr-2" />
                  Jabatan
                  {position && (
                    <Separator
                      orientation="vertical"
                      className="mx-2 bg-gray-500 w-[1.5px]"
                    />
                  )}
                  {position && (
                    <Badge className="rounded bg-gray-200 hover:bg-gray-200 text-black font-normal capitalize">
                      {position === "STAFF" ? "Staff" : "Ketua"}
                    </Badge>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="p-0 w-52" align="start">
                <Command>
                  <CommandGroup>
                    <CommandList>
                      <CommandItem onSelect={() => setPosition("STAFF")}>
                        <Checkbox
                          className="w-4 h-4 mr-2"
                          checked={position === "STAFF"}
                          onCheckedChange={() =>
                            position === "STAFF"
                              ? setPosition("")
                              : setPosition("STAFF")
                          }
                        />
                        Staff
                      </CommandItem>
                      <CommandItem onSelect={() => setPosition("CHIEF")}>
                        <Checkbox
                          className="w-4 h-4 mr-2"
                          checked={position === "CHIEF"}
                          onCheckedChange={() =>
                            position === "CHIEF"
                              ? setPosition("")
                              : setPosition("CHIEF")
                          }
                        />
                        Ketua
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
          >
            <RotateCcw className="w-4 h-4" />
          </Button>
          <Link href="/admin/supervisors/create" className="w-full md:w-auto">
            <Button className="h-9 w-full md:w-auto">
              <PlusCircle className="w-4 h-4 mr-2" />
              Add Supervisor
            </Button>
          </Link>
        </div>
      </div>
      {supervisors.length !== 0 ? (
        <div className="flex flex-col gap-3">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 p-3 rounded-lg border">
            {supervisors.map((item) => (
              <Card key={item.id} className="col-span-1 w-full flex flex-col">
                <div className="flex flex-col px-2 gap-3 py-2">
                  <div className="relative w-full aspect-square rounded overflow-hidden shadow">
                    <Image
                      src={item.imageUrl ?? "/images/main_image.jpg"}
                      alt=""
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex flex-col gap-5">
                    <div className="flex flex-col gap-2">
                      <h5 className="line-clamp-2 font-semibold capitalize leading-tight">
                        {item.name}
                      </h5>
                      <div>
                        <p className="w-20 flex justify-center py-0.5 bg-gray-200 rounded-full text-sm">
                          {item.position === "STAFF" ? "Staff" : "Ketua"}
                        </p>
                      </div>
                    </div>
                    <div className="flex w-full items-center text-xs text-gray-400 gap-2 capitalize">
                      <p>{item.date}</p>
                      <p>-</p>
                      <p>{item.cabang}</p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center border-t py-2 px-2 w-full gap-2">
                  <Link
                    href={`/admin/supervisors/${item.id}`}
                    className="w-full"
                  >
                    <Button className="w-full">Edit</Button>
                  </Link>
                  <Button
                    size={"icon"}
                    variant={"destructive"}
                    className="flex-none"
                    onClick={() => onOpen("delete-supervisor", item.id)}
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
        <div className="flex items-center justify-center p-3 rounded-lg border min-h-[200px]">
          <div className="flex flex-col items-center gap-3">
            <DatabaseBackup className="w-20 h-20 stroke-[1.5]" />
            <p className="font-semibold">No videos listed.</p>
          </div>
        </div>
      )}
    </div>
  );
};
