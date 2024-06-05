"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  CircleFadingPlus,
  Filter,
  Edit,
  Eye,
  MoreHorizontal,
  Trash2,
  PlusCircle,
  Search,
  DatabaseBackup,
  SquareArrowOutUpRight,
  PlayCircle,
  X,
  XCircle,
  RotateCcw,
  ChevronLeft,
  ChevronRight,
  Loader2,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn, mapCabang } from "@/lib/utils";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
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
import { VideoColumnsProps } from "../page";
import { useModal } from "@/hooks/use-modal";
import { useDebounce } from "@/hooks/use-debounce";
import { useCookies } from "next-client-cookies";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import axios from "axios";
import { formatDistanceStrict } from "date-fns";
import { id as indonesia } from "date-fns/locale";

export const VideoTable = ({ isAdmin }: { isAdmin: boolean }) => {
  const [isMounted, setIsMounted] = useState(false);
  const [videos, setVideos] = useState<VideoColumnsProps[]>([]);
  const [isUserAdmin, setIsUserAdmin] = useState(false);
  const [search, setSearch] = useState("");
  const searchValue = useDebounce(search);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [status, setStatus] = useState("");
  const [cabang, setCabang] = useState("");
  const cookies = useCookies();
  const { onOpen } = useModal();
  const [isLoading, setIsLoading] = useState(false);

  const handleGetPodters = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get(
        `/api/admin/videos?p=${page}&q=${searchValue}&s=${status}&c=${cabang}`
      );
      const data = res.data.data.data;
      const formatedVideos: VideoColumnsProps[] = data.map((item: any) => ({
        id: item.id,
        title: item.title,
        category: item.category.name,
        videoUrl: item.videoUrl,
        thumbnailUrl: item.thumbnailUrl,
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
        isPublish: item.isPublish,
      }));
      setVideos(formatedVideos);
      setTotalPage(res.data.data.last_page);
    } catch (error) {
      console.log(["ERROR_GET_VIDEOS:"], error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    handleGetPodters();
    if (cookies.get("updated")) {
      cookies.remove("updated");
    }
  }, [status, page, searchValue, cabang, cookies.get("updated")]);

  useEffect(() => {
    setIsMounted(true);
    handleGetPodters();
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
                  Status
                  {status && (
                    <Separator
                      orientation="vertical"
                      className="mx-2 bg-gray-500 w-[1.5px]"
                    />
                  )}
                  {status && (
                    <Badge className="rounded bg-gray-200 hover:bg-gray-200 text-black font-normal capitalize">
                      {status === "isPublish" ? "is publish" : status}
                    </Badge>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="p-0 w-32" align="start">
                <Command>
                  <CommandGroup>
                    <CommandList>
                      <CommandItem
                        onSelect={() =>
                          status !== "draft"
                            ? setStatus("draft")
                            : setStatus("")
                        }
                      >
                        <Checkbox
                          className="w-4 h-4 mr-2"
                          checked={status === "draft"}
                          onCheckedChange={() =>
                            status !== "draft"
                              ? setStatus("draft")
                              : setStatus("")
                          }
                        />
                        Draft
                      </CommandItem>
                      <CommandItem
                        onSelect={() =>
                          status !== "isPublish"
                            ? setStatus("isPublish")
                            : setStatus("")
                        }
                      >
                        <Checkbox
                          className="w-4 h-4 mr-2"
                          checked={status === "isPublish"}
                          onCheckedChange={() =>
                            status !== "isPublish"
                              ? setStatus("isPublish")
                              : setStatus("")
                          }
                        />
                        Is Publish
                      </CommandItem>
                    </CommandList>
                  </CommandGroup>
                </Command>
              </PopoverContent>
            </Popover>
            {(status || cabang) && (
              <Button
                variant={"ghost"}
                className="h-9 flex px-3"
                onClick={() => {
                  setCabang("");
                  setStatus("");
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
          <Link href="/admin/videos/create" className="w-full md:w-auto">
            <Button className="h-9 w-full md:w-auto" disabled={isLoading}>
              <PlusCircle className="w-4 h-4 mr-2" />
              Add Video
            </Button>
          </Link>
        </div>
      </div>
      {videos.length !== 0 ? (
        <div className="flex flex-col gap-3">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 p-3 rounded-lg border relative">
            {isLoading && (
              <div className="w-full h-full absolute bg-gray-500/20 backdrop-blur-sm top-0 left-0 z-10 flex items-center justify-center rounded-md">
                <Loader2 className="w-10 h-10 animate-spin text-gray-700 dark:text-white" />
              </div>
            )}
            {videos.map((item) => (
              <Card key={item.id} className="col-span-1  flex flex-col">
                <div className="flex flex-col px-2 gap-3 py-2">
                  <div className="relative w-full aspect-video rounded overflow-hidden shadow">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button className="opacity-0 absolute top-0 left-0 w-full h-full hover:opacity-100 bg-transparent z-10 hover:bg-black/10 backdrop-blur-sm">
                          <PlayCircle className="w-10 h-10 stroke-[1.5] text-black" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-3xl w-full p-2">
                        <iframe
                          src={`https://www.youtube.com/embed/${item.videoUrl}?vq=hd1080&modestbranding=1&rel=0&hl=id-ID`}
                          className="w-full aspect-video rounded-md"
                          allow="encrypted-media"
                          allowFullScreen
                          title={item.title}
                        />
                      </DialogContent>
                    </Dialog>
                    <Image
                      src={item.thumbnailUrl}
                      alt=""
                      fill
                      className="object-cover"
                    />
                    <p className="px-5 text-xs py-1 bg-black text-white rounded-full absolute top-2 right-2">
                      {item.category}
                    </p>
                  </div>
                  <div className="flex flex-col gap-3">
                    <div className="flex flex-col gap-1">
                      <h5 className="line-clamp-2 font-semibold capitalize leading-tight">
                        {item.title}
                      </h5>
                    </div>
                    <div className="flex w-full items-center text-xs text-gray-400 gap-2 capitalize">
                      <p>{item.date}</p>
                      <p>-</p>
                      <p>{item.cabang}</p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between border-t py-2 px-2">
                  <div>
                    <p
                      className={cn(
                        "px-4 py-0.5 rounded-full text-xs font-medium",
                        item.isPublish ? "bg-emerald-100" : "bg-gray-100"
                      )}
                    >
                      {item.isPublish ? "Publish" : "Draft"}
                    </p>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        className={
                          "rounded-full border-gray-200 hover:border-gray-500 border"
                        }
                        variant={"ghost"}
                        size={"icon"}
                      >
                        <MoreHorizontal className="h-4 w-4 " />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <Link href={`/admin/videos/${item.id}`}>
                        <DropdownMenuItem>
                          <Edit className="h-4 w-4 mr-2" />
                          Edit
                        </DropdownMenuItem>
                      </Link>
                      <DropdownMenuItem
                        className="group"
                        onSelect={() => onOpen("delete-video", item.id)}
                      >
                        <Trash2 className="h-4 w-4 mr-2 group-hover:text-red-600 text-red-500" />
                        <p className="group-hover:text-red-600 text-red-500">
                          Hapus
                        </p>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
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
            <p className="font-semibold">No videos listed.</p>
          </div>
        </div>
      )}
    </div>
  );
};
