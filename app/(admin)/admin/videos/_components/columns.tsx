"use client";

import { ColumnDef } from "@tanstack/react-table";
import CellAction from "./cell-action";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Popover, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { SquareArrowOutUpRight } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

export interface VideoColumnsProps {
  id: string;
  title: string;
  category: string;
  description: string;
  videoUrl: string;
  isOwner: boolean;
  isPublish: boolean;
}

export const columns: ColumnDef<VideoColumnsProps>[] = [
  {
    accessorKey: "title",
    header: () => <div className="text-center">Title</div>,
    cell: ({ row }) => (
      <div>
        {row.original.title}
        <Dialog>
          <DialogTrigger asChild>
            <Button className="p-0 h-3 w-3 bg-transparent rounded-none text-black hover:bg-transparent ml-2">
              <SquareArrowOutUpRight className="w-2 h-2" />
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl w-full">
            <iframe
              src={`https://www.youtube.com/embed/${row.original.videoUrl}?vq=hd1080&modestbranding=1&rel=0&hl=id-ID`}
              className="w-full aspect-video rounded-md mt-4"
              title={row.original.title}
            />
          </DialogContent>
        </Dialog>
      </div>
    ),
  },
  {
    accessorKey: "category",
    header: () => <div className="text-center">Category</div>,
    cell: ({ row }) => (
      <Badge className="bg-gray-800 text-white font-normal rounded hover:bg-gray-700">
        {row.original.category}
      </Badge>
    ),
  },
  {
    accessorKey: "description",
    header: () => <div className="text-center">Description</div>,
  },
  {
    accessorKey: "isPublish",
    header: () => <div className="text-center">IsPublish</div>,
    cell: ({ row }) => (
      <Badge
        className={cn(
          "text-black font-normal",
          row.original.isPublish === false
            ? "bg-gray-200 hover:bg-gray-300"
            : "bg-green-200 hover:bg-green-300"
        )}
      >
        {row.original.isPublish === false ? "Darf" : "Published"}
      </Badge>
    ),
  },
  {
    id: "action",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
