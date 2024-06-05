"use client";

import React, { FormEvent, useEffect, useState } from "react";
import { CalendarClock, CalendarIcon, Clock, Loader2 } from "lucide-react";
import { cn, formatTanggal } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { useMediaQuery } from "@/hooks/use-media-query";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { InfoProps } from "./client";
import axios from "axios";
import { toast } from "sonner";
import { parse } from "date-fns";
import { id as indonesia } from "date-fns/locale";
import { useRouter } from "next/navigation";
import { useCookies } from "next-client-cookies";
import { $Enums } from "@prisma/client";

export const TimeForm = ({
  information,
  cabang,
  isLoading,
}: {
  isLoading: boolean;
  cabang: $Enums.CabangRole;
  information: InfoProps | null;
}) => {
  const [isMounted, setIsMounted] = useState(false);
  const [tempat, setTempat] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const router = useRouter();
  const [jam, setJam] = useState("00");
  const [menit, setMenit] = useState("00");
  const [detik, setDetik] = useState("00");
  const [isOpenDate, setIsOpenDate] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const [info, setInfo] = useState<Date>(new Date());
  const cookies = useCookies();

  const triggerDate = selectedDate
    ? formatTanggal(
        selectedDate ? selectedDate.toString() : new Date().toString()
      )
    : "";
  const triggerTime = `${jam}:${menit}:${detik}`;

  const formatTimePartial = () => {
    setSelectedDate(info);
    setJam(info.getHours().toString().padStart(2, "0"));
    setMenit(info.getMinutes().toString().padStart(2, "0"));
    setDetik(info.getSeconds().toString().padStart(2, "0"));
  };

  const handleUpdate = async (e: FormEvent) => {
    e.preventDefault();
    const body = {
      tanggal: triggerDate,
      waktu: triggerTime,
      tempat: tempat,
      cabang: cabang,
    };
    try {
      await axios.patch("/api/admin/profile/info", body);
      toast.success("Info berhasil diperbarui");
      cookies.set("updated", "updated");
      router.refresh();
    } catch (error) {
      toast.error("Info gagal diperbarui");
    }
  };

  useEffect(() => {
    setSelectedDate(info);
    formatTimePartial();
  }, [info]);

  useEffect(() => {
    setIsMounted(true);
    if (information?.tanggal && information?.waktu) {
      setInfo(
        parse(
          `${information?.tanggal} ${information?.waktu}`,
          "dd MMMM yyyy HH:mm:ss",
          new Date(),
          { locale: indonesia }
        )
      );
    } else {
      setInfo(new Date());
    }
    if (information?.tempat) {
      setTempat(information?.tempat);
    } else {
      setTempat("");
    }
  }, [information]);

  if (!isMounted) {
    return;
  }

  return (
    <form
      onSubmit={handleUpdate}
      className="px-1 md:px-2 flex gap-2 md:gap-4 w-full flex-col pb-10"
    >
      <h3 className="text-lg font-semibold flex items-center mb-3">
        <div className="h-10 w-10 border rounded-full flex justify-center items-center border-black mr-2">
          <CalendarClock className="w-5 h-5" />
        </div>
        Tanggal, Waktu dan Tempat
      </h3>
      <div className="flex w-full gap-4 flex-col-reverse md:flex-row relative">
        {isLoading && (
          <div className="w-full h-full absolute bg-gray-500/20 backdrop-blur-sm top-0 left-0 z-10 flex items-center justify-center rounded-md">
            <Loader2 className="w-10 h-10 animate-spin text-gray-700 dark:text-white" />
          </div>
        )}
        <div className="flex flex-col w-full gap-3">
          <div className="flex flex-col gap-y-2 w-full">
            <Label>Tanggal</Label>

            {isDesktop ? (
              <Popover open={isOpenDate} onOpenChange={setIsOpenDate}>
                <PopoverTrigger asChild>
                  <Button className="justify-between bg-transparent hover:bg-transparent text-black border dark:text-white">
                    {triggerDate}
                    <CalendarIcon className="w-4 h-4" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="flex px-0 py-2 gap-0" align="start">
                  <Calendar
                    selected={selectedDate}
                    initialFocus
                    onSelect={setSelectedDate}
                    mode="single"
                  />
                </PopoverContent>
              </Popover>
            ) : (
              <Drawer open={isOpenDate} onOpenChange={setIsOpenDate}>
                <DrawerTrigger asChild>
                  <Button className="justify-between bg-transparent hover:bg-transparent text-black border dark:text-white">
                    {triggerDate}
                    <CalendarIcon className="w-4 h-4" />
                  </Button>
                </DrawerTrigger>
                <DrawerContent className="flex justify-center px-0 py-2 gap-0">
                  <Calendar
                    className="w-[290px] mx-auto"
                    selected={selectedDate}
                    initialFocus
                    onSelect={setSelectedDate}
                    mode="single"
                  />
                </DrawerContent>
              </Drawer>
            )}
          </div>
          <div className="flex flex-col gap-y-2 w-full">
            <Label>Waktu</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button className="justify-between bg-transparent hover:bg-transparent text-black border dark:text-white">
                  {triggerTime}
                  <Clock className="w-4 h-4" />
                </Button>
              </PopoverTrigger>
              <PopoverContent
                className="flex px-0 py-2 gap-0 w-[216px]"
                align="start"
              >
                <ScrollArea className="h-56">
                  <Command>
                    <CommandGroup>
                      <CommandList className="w-16 px-2 max-h-none">
                        {Array.from({ length: 24 }, (_, index) => (
                          <CommandItem
                            className={cn(
                              "w-12 h-7 text-sm p-0 flex items-center justify-center last:mb-[193px] tracking-wider",
                              parseFloat(jam) === index
                                ? "bg-gray-200 aria-selected:bg-gray-300 dark:bg-gray-700 dark:aria-selected:bg-gray-600"
                                : ""
                            )}
                            key={index}
                            onSelect={() =>
                              setJam(index.toString().padStart(2, "0"))
                            }
                            value={index.toString()}
                          >
                            {index.toString().padStart(2, "0")}
                          </CommandItem>
                        ))}
                      </CommandList>
                    </CommandGroup>
                  </Command>
                </ScrollArea>
                <ScrollArea className="h-56">
                  <Command>
                    <CommandGroup>
                      <CommandList className="w-16 px-2 max-h-none">
                        {Array.from({ length: 60 }, (_, index) => (
                          <CommandItem
                            className={cn(
                              "w-12 h-7 text-sm p-0 flex items-center justify-center last:mb-[193px] tracking-wider",
                              parseFloat(menit) === index
                                ? "bg-gray-200 aria-selected:bg-gray-300 dark:bg-gray-700 dark:aria-selected:bg-gray-600"
                                : ""
                            )}
                            key={index}
                            onSelect={() =>
                              setMenit(index.toString().padStart(2, "0"))
                            }
                            value={index.toString()}
                          >
                            {index.toString().padStart(2, "0")}
                          </CommandItem>
                        ))}
                      </CommandList>
                    </CommandGroup>
                  </Command>
                </ScrollArea>
                <ScrollArea className="h-56">
                  <Command>
                    <CommandGroup>
                      <CommandList className="w-16 px-2 max-h-none">
                        {Array.from({ length: 60 }, (_, index) => (
                          <CommandItem
                            className={cn(
                              "w-12 h-7 text-sm p-0 flex items-center justify-center last:mb-[193px] tracking-wider",
                              parseFloat(detik) === index
                                ? "bg-gray-200 aria-selected:bg-gray-300 dark:bg-gray-700 dark:aria-selected:bg-gray-600"
                                : ""
                            )}
                            key={index}
                            onSelect={() =>
                              setDetik(index.toString().padStart(2, "0"))
                            }
                            value={index.toString()}
                          >
                            {index.toString().padStart(2, "0")}
                          </CommandItem>
                        ))}
                      </CommandList>
                    </CommandGroup>
                  </Command>
                </ScrollArea>
              </PopoverContent>
            </Popover>
          </div>
        </div>
        <div className="w-full">
          <div className="flex flex-col gap-y-2 w-full">
            <Label>Tempat</Label>
            <Input
              onChange={(e) => setTempat(e.target.value)}
              value={tempat}
              placeholder="Tempat..."
            />
          </div>
        </div>
      </div>
      <Card className="flex justify-between items-center py-2 px-3 md:px-5 gap-3 bg-gray-100">
        <p className="text-sm text-gray-500">
          Check required! Information auto publish
        </p>
        <Button type="submit">Save</Button>
      </Card>
    </form>
  );
};
