"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useModal } from "@/hooks/use-modal";
import { cn } from "@/lib/utils";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "@hello-pangea/dnd";
import { Grip, Pencil, Trash2 } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { RoundownsProps } from "./client";

interface AcaraListProps {
  items: RoundownsProps[];
  onReorder: (updateData: { id: string; position: number }[]) => void;
  onEdit: (id: string) => void;
}

export const AcaraList = ({ items, onReorder, onEdit }: AcaraListProps) => {
  const params = useParams();
  const [isMounted, setIsMounted] = useState(false);
  const [roundowns, setroundowns] = useState(items);
  const { onOpen } = useModal();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    setroundowns(items);
  }, [items]);

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const items = Array.from(roundowns);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    const startIndex = Math.min(result.source.index, result.destination.index);
    const endIndex = Math.max(result.source.index, result.destination.index);

    const updatedRoundowns = items.slice(startIndex, endIndex + 1);

    setroundowns(items);

    const bulkUpdateData = updatedRoundowns.map((chapter) => ({
      id: chapter.id,
      position: items.findIndex((item) => item.id === chapter.id),
    }));

    onReorder(bulkUpdateData);
  };

  if (!isMounted) {
    return null;
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="roundowns">
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {roundowns.map((acara, index) => (
              <Draggable key={acara.id} draggableId={acara.id} index={index}>
                {(provided) => (
                  <div
                    className={cn(
                      "flex items-center gap-x-2 bg-slate-200 border-slate-200 border text-slate-700 rounded-md mb-4 text-sm",
                      acara.id === params.ayatId &&
                        "bg-sky-100 border-sky-200 text-sky-700"
                    )}
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                  >
                    <div
                      className={cn(
                        "p-3 border-r border-r-slate-200 hover:bg-slate-300 rounded-md transition",
                        acara.id === params.ayatId &&
                          "border-r-sky-200 hover:bg-sky-200"
                      )}
                      {...provided.dragHandleProps}
                    >
                      <Grip className="h-5 w-5" />
                    </div>
                    <div className="flex w-full justify-between items-center pr-2">
                      <div className="flex md:items-center flex-col md:flex-row gap-1 overflow-hidden w-full">
                        <div className="capitalize line-clamp-1 w-full">
                          {acara.title}
                        </div>
                        <div className="md:ml-auto pr-2 flex items-center">
                          <Badge
                            className={cn(
                              "bg-slate-500 text-xs capitalize font-normal whitespace-nowrap",
                              acara.imageUrl && "bg-sky-700"
                            )}
                          >
                            {acara.imageUrl ? "Image ready" : "Image not ready"}
                          </Badge>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <Button
                          onClick={() => onEdit(acara.id)}
                          className={cn(
                            "w-8 h-8 p-0 bg-transparent hover:bg-gray-300 text-black"
                          )}
                        >
                          <Pencil className="w-4 h-4 cursor-pointer transition" />
                        </Button>
                        <Button
                          onClick={() => onOpen("delete-roundown", acara.id)}
                          className={cn(
                            "w-8 h-8 p-0 bg-transparent hover:bg-red-200 text-red-500"
                          )}
                        >
                          <Trash2 className="w-4 h-4 cursor-pointer transition" />
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};
