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
} from "lucide-react";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { BlogsColumnsProps } from "../page";
import { useModal } from "@/hooks/use-modal";

export const BlogTable = ({ data }: { data: BlogsColumnsProps[] }) => {
  const [isMounted, setIsMounted] = useState(false);
  const [blogs, setBlogs] = useState<BlogsColumnsProps[]>([]);
  const { onOpen } = useModal();

  useEffect(() => {
    setIsMounted(true);
    setBlogs(data);
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
            Status
          </Button>
          <Link href="/admin/blogs/create" className="w-full md:w-auto">
            <Button className="h-9 w-full md:w-auto">
              <PlusCircle className="w-4 h-4 mr-2" />
              Add Blog
            </Button>
          </Link>
        </div>
      </div>
      {blogs.length !== 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 p-3 rounded-lg border">
          {blogs.map((item) => (
            <Card key={item.id} className="col-span-1  flex flex-col">
              <div className="flex flex-col px-2 gap-5 py-2">
                <div className="relative w-full aspect-video rounded overflow-hidden shadow">
                  <Image
                    src={item.imageUrl}
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
                    <p className="text-sm leading-tight line-clamp-3 text-gray-600">
                      {item.highlight}
                    </p>
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
                    <Link href={`/admin/blogs/${item.id}`}>
                      <DropdownMenuItem>
                        <Edit className="h-4 w-4 mr-2" />
                        Edit
                      </DropdownMenuItem>
                    </Link>
                    <DropdownMenuItem
                      className="group"
                      onSelect={() => onOpen("delete-blog", item.id)}
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
      ) : (
        <div className="flex items-center justify-center p-3 rounded-lg border min-h-[200px]">
          <div className="flex flex-col items-center gap-3">
            <DatabaseBackup className="w-20 h-20 stroke-1" />
            <p className="font-medium">No blogs listed.</p>
          </div>
        </div>
      )}
    </div>
  );
};
