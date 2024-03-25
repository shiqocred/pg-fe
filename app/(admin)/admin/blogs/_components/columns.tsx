"use client";

import { ColumnDef } from "@tanstack/react-table";
import CellAction from "./cell-action";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export interface BlogsColumnsProps {
  id: string;
  title: string;
  category: string;
  author: string;
  cabang: string;
  highlight: string;
  isOwner: boolean;
  isPublish: boolean;
}

export const columns: ColumnDef<BlogsColumnsProps>[] = [
  {
    accessorKey: "title",
    header: () => <div className="text-center">Title</div>,
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
    accessorKey: "author",
    header: () => <div className="text-center">Author</div>,
    cell: ({ row }) => row.original.cabang + " - " + row.original.author,
  },
  {
    accessorKey: "highlight",
    header: () => <div className="text-center">HighLight</div>,
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
