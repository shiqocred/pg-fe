"use client";

import { Button } from "@/components/ui/button";
import { FormEvent, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { $Enums } from "@prisma/client";

interface ClientAcaraProps {
  initialData: {
    profile: {
      cabang: $Enums.CabangRole;
    };
    id: string;
    title: string;
    imageUrl: string | null;
    position: number;
  } | null;
}

export const ClientAcara = ({ initialData }: ClientAcaraProps) => {
  const params = useParams();
  const router = useRouter();
  const oldImage = initialData?.imageUrl;
  const [input, setInput] = useState<{
    title: string;
    imageUrl: FileList | null;
  }>({
    title: initialData?.title ?? "",
    imageUrl: null,
  });

  const onUpdate = async (e: FormEvent) => {
    e.preventDefault();
    const values = new FormData();
    values.append("title", input.title);
    if (input.imageUrl) {
      values.append("imageUrl", input.imageUrl[0]);
    }
    try {
      await axios.patch(`/api/admin/roundowns/${params.roundownId}`, values);
      toast.success("Acara updated.");
      router.push(`/admin/roundowns`);
    } catch {
      toast.error("Something went wrong.");
    }
  };
  return (
    <div className="flex gap-4 w-full">
      {
        <div>
          <div className="relative w-[300px] aspect-square overflow-hidden rounded-md shadow-md">
            <Image
              src={
                input.imageUrl
                  ? URL.createObjectURL(input.imageUrl[0])
                  : oldImage
                  ? oldImage
                  : "/images/main_image.jpg"
              }
              alt=""
              fill
              className="object-cover"
            />
          </div>
          {input.imageUrl && (
            <Button
              onClick={() => setInput((prev) => ({ ...prev, imageUrl: null }))}
              variant={"destructive"}
              className="mt-4"
            >
              Hapus Gambar
            </Button>
          )}
        </div>
      }
      <form onSubmit={onUpdate} className="flex flex-col w-full gap-4">
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
        </div>
        <div className="">
          <Button type="submit" className="mt-2">
            Update
          </Button>
        </div>
      </form>
    </div>
  );
};
