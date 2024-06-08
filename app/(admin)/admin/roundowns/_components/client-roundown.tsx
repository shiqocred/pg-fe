"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Loader2, PlusCircle, ScrollText } from "lucide-react";
import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "sonner";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { AcaraList } from "./acara-list";
import Image from "next/image";
import { RoundownsProps } from "./client";
import { useCookies } from "next-client-cookies";
import { useModal } from "@/hooks/use-modal";

interface RoundownProps {
  message: string;
  data: {
    id: string;
    title: string;
    imageUrl: string | null;
  };
}

export const ClientRoundown = ({
  initialData,
  cabang,
  isLoading,
}: {
  isLoading: boolean;
  initialData: RoundownsProps[];
  cabang: string;
}) => {
  const [isCreating, setIsCreating] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [data, setData] = useState<RoundownsProps[]>([]);
  const router = useRouter();
  const [editId, setEditId] = useState("");
  const [urlImage, setUrlImage] = useState("");
  const [input, setInput] = useState<{
    title: string;
    imageUrl: FileList | null;
  }>({
    title: "",
    imageUrl: null,
  });
  const cookies = useCookies();
  const { onOpen } = useModal();
  const updated = cookies.get("updated");

  const toggleCreating = () => {
    setIsCreating((e) => !e);
  };

  const getDetail = async (roundownId: string) => {
    try {
      const res = await axios.get(`/api/admin/roundowns/${roundownId}`);
      if (res) {
        setIsEditing(true);
        setIsCreating(true);
        setInput((prev) => ({ ...prev, title: res.data.roundowns.title }));
        setUrlImage(res.data.roundowns.imageUrl ?? "");
        setEditId(res.data.roundowns.id);
      }
    } catch (error) {
      console.log("ERROR_GET_DETAIL", error);
    }
  };

  const handleClose = () => {
    setInput({
      title: "",
      imageUrl: null,
    });
    setIsCreating(false);
    setIsEditing(false);
    setEditId("");
    setUrlImage("");
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const values = new FormData();
    values.append("title", input.title);
    values.append("cabang", cabang);
    if (input.imageUrl && input.imageUrl.length > 0) {
      values.append("imageUrl", input.imageUrl[0]);
    }
    if (isEditing) {
      try {
        await axios.patch(`/api/admin/roundowns/${editId}`, values);
        toast.success("Roundown updated.");
        handleClose();
        cookies.set("updated", "updated");
        router.refresh();
      } catch {
        toast.error("Something went wrong.");
      }
    } else {
      try {
        await axios.post(`/api/admin/roundowns`, values);
        toast.success("Roundown created.");
        handleClose();
        cookies.set("updated", "updated");
        router.refresh();
      } catch {
        toast.error("Something went wrong.");
      }
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

  useEffect(() => {
    handleClose();
  }, [updated]);
  useEffect(() => {
    setData(initialData);
  }, [initialData]);

  return (
    <div className="mt-6 border rounded-md p-4 relative w-full">
      {(isUpdating || isLoading) && (
        <div className="absolute h-full w-full bg-slate-500/20 rounded-md top-0 right-0 flex items-center justify-center">
          <Loader2 className="h-6 w-6 text-sky-700 animate-spin" />
        </div>
      )}
      <div className="font-medium flex md:items-center md:justify-between mb-5 flex-col md:flex-row gap-3">
        <h3 className="text-lg font-semibold flex items-center">
          <div className="h-10 w-10 border rounded-full flex justify-center items-center border-black mr-2">
            <ScrollText className="w-5 h-5" />
          </div>
          List Roundowns
        </h3>
        {isCreating ? (
          <Button variant={"outline"} type="button" onClick={handleClose}>
            Cancel
          </Button>
        ) : (
          <Button variant={"outline"} type="button" onClick={toggleCreating}>
            <PlusCircle className="h-4 w-4 mr-2" />
            Tambah Acara
          </Button>
        )}
      </div>
      {isCreating ? (
        <form onSubmit={onSubmit} className="flex flex-col w-full gap-4">
          <div className="flex gap-3 flex-col md:flex-row">
            {input.imageUrl && input.imageUrl.length > 0 && (
              <div className="relative w-full lg:w-1/4 aspect-square overflow-hidden rounded-md group">
                <Button
                  onClick={() => {
                    setInput((prev) => ({ ...prev, imageUrl: null }));
                  }}
                  className="absolute p-0 w-full h-full top-0 left-0 z-10 group-hover:flex group-hover:bg-red-400/10 backdrop-blur-sm hidden text-black"
                >
                  Hapus Gambar
                </Button>
                <Image
                  src={URL.createObjectURL(input.imageUrl[0])}
                  alt=""
                  fill
                  className="object-cover"
                />
              </div>
            )}
            {(!input.imageUrl || input.imageUrl.length === 0) && !urlImage && (
              <div className="relative w-full lg:w-1/4 aspect-square overflow-hidden rounded-md group shadow-md border-gray-100 border">
                <Image
                  src={"/images/main_image.jpg"}
                  alt=""
                  fill
                  className="object-cover"
                />
              </div>
            )}
            {(!input.imageUrl || input.imageUrl.length === 0) && urlImage && (
              <div className="relative w-full lg:w-1/4 aspect-square overflow-hidden rounded-md group shadow-md border-gray-100 border">
                <Image src={urlImage} alt="" fill className="object-cover" />
              </div>
            )}
            <div className="w-full lg:w-3/4">
              <div>
                <Label>Acara</Label>
                <Input
                  value={input.title}
                  onChange={(e) =>
                    setInput((prev) => ({ ...prev, title: e.target.value }))
                  }
                />
              </div>
              <div className="w-full">
                <Label>Preview</Label>
                <Input
                  type="file"
                  onChange={(e) =>
                    setInput((prev) => ({ ...prev, imageUrl: e.target.files }))
                  }
                  accept="image/*"
                />
              </div>
            </div>
          </div>
          {isEditing ? (
            <div className="flex items-center gap-3">
              <Button type="submit" className="mt-2">
                Update
              </Button>
              <Button
                type="button"
                variant={"destructive"}
                className="mt-2"
                onClick={() => onOpen("delete-roundown", editId)}
              >
                Hapus
              </Button>
            </div>
          ) : (
            <div>
              <Button type="submit" className="mt-2">
                Simpan
              </Button>
            </div>
          )}
        </form>
      ) : (
        <div className="mt-2">
          <div
            className={cn(
              "text-sm",
              !initialData.length && "text-slate-500 italic"
            )}
          >
            {!initialData.length && "Roundown tidak ditemukan"}
            <AcaraList
              onEdit={(e) => getDetail(e)}
              onReorder={onReorder}
              items={data}
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
