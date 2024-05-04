"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Loader2, PlusCircle } from "lucide-react";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "sonner";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { AcaraList } from "./acara-list";
import Image from "next/image";

interface RoundownProps {
  initialData: {
    id: string;
    title: string;
    imageUrl: string | null;
    position: number;
    profile: {
      cabang: string;
    };
  }[];
}

export const ClientRoundown = ({ initialData }: RoundownProps) => {
  const [isCreating, setIsCreating] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const router = useRouter();
  const [input, setInput] = useState<{
    title: string;
    imageUrl: FileList | null;
  }>({
    title: "",
    imageUrl: null,
  });

  const toggleCreating = () => {
    setIsCreating((e) => !e);
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const values = new FormData();
    values.append("title", input.title);
    if (input.imageUrl) {
      values.append("imageUrl", input.imageUrl[0]);
    }
    try {
      await axios.post(`/api/admin/roundowns`, values);
      toast.success("Acara created.");
      toggleCreating();
      router.refresh();
    } catch {
      toast.error("Something went wrong.");
    }
  };

  const onReorder = async (updateData: { id: string; position: number }[]) => {
    try {
      setIsUpdating(true);

      await axios.put(`/api/admin/roundowns/reorder`, {
        list: updateData,
      });
      toast.success("Roundown reordered.");
      router.refresh();
    } catch (error) {
      toast.error("Something went wrong.");
    } finally {
      setIsUpdating(false);
    }
  };

  const onEdit = (id: string) => {
    router.push(`/admin/roundowns/${id}`);
  };
  return (
    <div className="mt-6 border rounded-md p-4 relative">
      {isUpdating && (
        <div className="absolute h-full w-full bg-slate-500/20 rounded-md top-0 right-0 flex items-center justify-center">
          <Loader2 className="h-6 w-6 text-sky-700 animate-spin" />
        </div>
      )}
      <div className="font-medium flex items-center justify-between">
        List Roundown
        <Button variant={"ghost"} onClick={toggleCreating}>
          {isCreating ? (
            <>Cancel</>
          ) : (
            <>
              <PlusCircle className="h-4 w-4 mr-2" />
              Tambah Acara
            </>
          )}
        </Button>
      </div>
      {isCreating ? (
        <form onSubmit={onSubmit} className="flex flex-col w-full gap-4">
          <div>
            <Label>Acara</Label>
            <Input
              value={input.title}
              onChange={(e) =>
                setInput((prev) => ({ ...prev, title: e.target.value }))
              }
            />
          </div>
          <div className="flex w-full gap-4 items-start">
            <div className="w-full">
              <Label>Preview</Label>
              <Input
                type="file"
                onChange={(e) =>
                  setInput((prev) => ({ ...prev, imageUrl: e.target.files }))
                }
              />
            </div>
            {input.imageUrl && (
              <div>
                <div className="relative w-[300px] aspect-square overflow-hidden rounded-md">
                  <Image
                    src={URL.createObjectURL(input.imageUrl[0])}
                    alt=""
                    fill
                    className="object-cover"
                  />
                </div>
                <Button
                  onClick={() =>
                    setInput((prev) => ({ ...prev, imageUrl: null }))
                  }
                  variant={"destructive"}
                  className="mt-4"
                >
                  Hapus Gambar
                </Button>
              </div>
            )}
          </div>
          <div className="">
            <Button type="submit" className="mt-2">
              Simpan
            </Button>
          </div>
        </form>
      ) : (
        <div className="mt-2">
          <div
            className={cn(
              "text-sm",
              !initialData.length && "text-slate-500 italic"
            )}
          >
            {!initialData.length && "Pasal tidak ditemukan"}
            <AcaraList
              onEdit={onEdit}
              onReorder={onReorder}
              items={initialData || []}
            />
          </div>
          <p className="text-xs text-muted-foreground mt-4">
            drag and drop Acara to reorder Roundown
          </p>
        </div>
      )}
    </div>
  );
};
