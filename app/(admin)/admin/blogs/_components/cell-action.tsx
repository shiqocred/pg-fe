"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Edit, MoreHorizontal, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { BlogsColumnsProps } from "./columns";

interface CellActionProps {
  data: BlogsColumnsProps;
}

const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const router = useRouter();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          className={"rounded-full"}
          variant={"ghost"}
          size={"icon"}
          disabled={!data.isOwner}
        >
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem
          onClick={() => {
            router.refresh();
            router.push(`/admin/blogs/${data.id}`);
          }}
        >
          <Edit className="h-4 w-4 mr-2" />
          Edit
        </DropdownMenuItem>
        <DropdownMenuItem className="group">
          <Trash2 className="h-4 w-4 mr-2 group-hover:text-red-600 text-red-500" />
          <p className="group-hover:text-red-600 text-red-500">Hapus</p>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default CellAction;
