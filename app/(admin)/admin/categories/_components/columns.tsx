"use client";

import { ColumnDef } from "@tanstack/react-table";
import CellAction from "./cell-action";

export interface CategoryColumnsProps {
  id: string;
  name: string;
  owner: boolean;
  branch: string;
}

export const columnsCategory: ColumnDef<CategoryColumnsProps>[] = [
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
