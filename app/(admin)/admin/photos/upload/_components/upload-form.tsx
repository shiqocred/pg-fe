"use client";

import { getPhotos } from "@/actions/get-photos";
import { getProfiles } from "@/actions/get-profiles";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { cn, mapCabang } from "@/lib/utils";
import { $Enums, Poster } from "@prisma/client";
import axios from "axios";
import {
  ChevronDown,
  ImageIcon,
  ImageMinus,
  ImagePlus,
  ImagesIcon,
  NotebookPen,
  X,
} from "lucide-react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { toast } from "sonner";

export const UploadForm = ({
  userId,
  isAdmin,
}: {
  userId: string;
  isAdmin: boolean;
}) => {
  const [isMounted, setIsMounted] = useState(false);

  const router = useRouter();

  const [cabang, setCabang] = useState<$Enums.CabangRole>("PUTRA1");

  const [idProfile, setIdProfile] = useState("");

  const [input, setInput] = useState<FileList | null>(null);

  const handleGetProfileId = async (data: $Enums.CabangRole) => {
    try {
      const res = await axios.get(`/api/admin/profile/id/${data}`);
      return res.data.profileId.id;
    } catch (error) {
      console.log("[ERROR_GET_PROFILEID]", error);
    }
  };

  const getPhotosRes = async () => {
    const profileId: string = await handleGetProfileId(cabang);

    setIdProfile(profileId);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const body = new FormData();

    if (input) {
      Array.from({ length: input.length }, (_, i) => {
        body.append("imageUrl", input[i]);
      });
    }
    body.append("profileId", idProfile);

    try {
      axios.post("/api/admin/photos", body);
      toast.success("Beberapa gambar berhasil ditambah");
      router.push("/admin/photos");
    } catch (error) {
      toast.success("Beberapa gambar gagal ditambah");
      router.refresh();
    }
  };

  useEffect(() => {
    getPhotosRes();
  }, [cabang]);

  useEffect(() => {
    getPhotosRes();
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }
  return (
    <div className="flex flex-col gap-y-2 w-full">
      <form
        onSubmit={handleSubmit}
        className="flex w-full gap-4 flex-col lg:flex-row"
        encType="multipart/form-data"
      >
        <div className="w-full lg:w-1/3">
          <Card className="flex flex-col w-full gap-y-4 p-3">
            <h3 className="text-lg font-semibold capitalize flex items-center">
              <div className="h-8 w-8 border rounded-full flex justify-center items-center border-black mr-2">
                <NotebookPen className="w-4 h-4" />
              </div>
              Upload Form
            </h3>
            <Separator className="bg-gray-500" />
            {isAdmin && (
              <div className="flex flex-col gap-y-2 w-full">
                <Label>Pondok Kampus</Label>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      className="w-full justify-between capitalize"
                      variant={"outline"}
                    >
                      {mapCabang
                        .find((i) => i.value === cabang)
                        ?.label.split("-")
                        .join(" ") ?? "Pilih kategori..."}
                      <ChevronDown className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    {mapCabang.map((item) => (
                      <DropdownMenuItem
                        key={item.value}
                        onClick={() => setCabang(item.value)}
                        className="capitalize"
                      >
                        {mapCabang
                          .find((i) => i.value === item.value)
                          ?.label.split("-")
                          .join(" ")}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            )}
            {isAdmin ? (
              cabang && (
                <div className="flex flex-col gap-y-2 w-full">
                  <Label>Upload multiple Image</Label>
                  <Input
                    type="file"
                    multiple
                    onChange={(e) => setInput(e.target.files)}
                    name="posterUrl"
                  />
                </div>
              )
            ) : (
              <div className="flex flex-col gap-y-2 w-full">
                <Label>Upload multiple Image</Label>
                <Input
                  type="file"
                  multiple
                  onChange={(e) => setInput(e.target.files)}
                  name="posterUrl"
                />
              </div>
            )}
            <Button type="submit">Upload</Button>
          </Card>
        </div>
        <div className="w-full lg:w-2/3">
          <Card className="flex flex-col w-full gap-y-4 p-3">
            <h3 className="text-lg font-semibold capitalize flex items-center">
              <div className="h-8 w-8 border rounded-full flex justify-center items-center border-black mr-2">
                <ImagesIcon className="w-4 h-4" />
              </div>
              Previews images
            </h3>
            <Separator className="bg-gray-500" />
            {input ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
                {Array.from({ length: input?.length ?? 0 }, (_, i) => (
                  <div
                    className="w-full relative aspect-square rounded overflow-hidden shadow-md"
                    key={i}
                  >
                    <Image
                      src={URL.createObjectURL(input[i])}
                      alt=""
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className="fl">
                <div className="w-full flex-col flex justify-center items-center rounded-md">
                  <ImagePlus className="w-20 h-20 stroke-1" />
                  <p className="font-semibold">No image previewed.</p>
                </div>
              </div>
            )}
          </Card>
        </div>
      </form>
    </div>
  );
};
