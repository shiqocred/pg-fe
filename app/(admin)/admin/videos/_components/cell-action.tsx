"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Edit, Eye, MoreHorizontal, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { VideoColumnsProps } from "./columns";

interface CellActionProps {
  data: VideoColumnsProps;
}

const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const router = useRouter();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className={"rounded-full"} variant={"ghost"} size={"icon"}>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={() => {}}>
          <Eye className="h-4 w-4 mr-2" />
          View
        </DropdownMenuItem>
        <DropdownMenuSeparator className="bg-slate-300" />
        <DropdownMenuItem
          onClick={() => {
            router.refresh();
            router.push(`/admin/videos/${data.id}`);
          }}
          disabled={!data.isOwner}
        >
          <Edit className="h-4 w-4 mr-2" />
          Edit
        </DropdownMenuItem>
        <DropdownMenuItem className="group" disabled={!data.isOwner}>
          <Trash2 className="h-4 w-4 mr-2 group-hover:text-red-600 text-red-500" />
          <p className="group-hover:text-red-600 text-red-500">Hapus</p>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default CellAction;
