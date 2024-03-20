"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ColumnDef } from "@tanstack/react-table";
import { Edit, MoreHorizontal, Trash2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import CellAction from "./cell-action";

export interface CategoryColumnsProps {
  id: string;
  name: string;
  owner: boolean;
  branch: string;
}

export const columns: ColumnDef<CategoryColumnsProps>[] = [
  {
    accessorKey: "name",
    header: () => <div className="text-center">Category Name</div>,
  },
  {
    accessorKey: "branch",
    header: () => <div className="text-center">Author</div>,
  },
  {
    id: "action",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
