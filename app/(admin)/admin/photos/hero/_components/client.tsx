"use client";

import { getHero } from "@/actions/get-hero";
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
  NotebookPen,
} from "lucide-react";
import { useCookies } from "next-client-cookies";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { toast } from "sonner";

export const PosterForm = ({
  userId,
  isAdmin,
}: {
  userId: string;
  isAdmin: boolean;
}) => {
  const [isMounted, setIsMounted] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const router = useRouter();

  const [cabang, setCabang] = useState<$Enums.CabangRole>("PUTRA1");

  const [idProfile, setIdProfile] = useState("");

  const [input, setInput] = useState<FileList | null>(null);

  const cookies = useCookies();

  const handleGetHero = async (data: string) => {
    try {
      const res = await axios.get(`/api/admin/profile/hero/${data}`);
      return res.data.heroUrl.heroUrl;
    } catch (error) {
      console.log("[ERROR_GET_HERO_URL]", error);
    }
  };

  const getHeroImage = async () => {
    const heroRes: string = await handleGetHero(cabang);

    setIdProfile(cabang);
    setImageUrl(heroRes);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const body = new FormData();
    if (input && input.length > 0) {
      body.append("heroUrl", input[0]);
    }
    body.append("cabang", idProfile);
    try {
      axios.patch("/api/admin/profile/hero", body);
      toast.success("Gambar berhasil diperbarui");
      cookies.set("updated", "updated");
      router.push("/admin/photos");
    } catch (error) {
      toast.success("Gambar gagal diperbarui");
      router.refresh();
    }
  };

  console.log(idProfile);

  useEffect(() => {
    getHeroImage();
  }, [cabang]);

  useEffect(() => {
    getHeroImage();
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }
  return (
    <div className="flex flex-col gap-y-2 w-full">
      <form
        onSubmit={handleSubmit}
        className="flex w-full gap-4 flex-col-reverse md:flex-row"
        encType="multipart/form-data"
      >
        <div className="w-full lg:w-2/3">
          <Card className="flex flex-col w-full gap-y-4 p-3">
            <h3 className="text-lg font-semibold capitalize flex items-center">
              <div className="h-8 w-8 border rounded-full flex justify-center items-center border-black mr-2">
                <NotebookPen className="w-4 h-4" />
              </div>
              Change Hero Image Form
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
                  <Label>Upload Image</Label>
                  <Input
                    type="file"
                    onChange={(e) => setInput(e.target.files)}
                    name="posterUrl"
                  />
                </div>
              )
            ) : (
              <div className="flex flex-col gap-y-2 w-full">
                <Label>Upload Image</Label>
                <Input
                  type="file"
                  onChange={(e) => setInput(e.target.files)}
                  name="posterUrl"
                />
              </div>
            )}
            <Button className="mt-2">Change</Button>
          </Card>
        </div>
        <div className="w-full lg:w-1/3">
          <Card className="flex flex-col w-full gap-y-4 p-3">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold capitalize flex items-center">
                <div className="h-8 w-8 border rounded-full flex justify-center items-center border-black mr-2">
                  <ImageIcon className="w-4 h-4" />
                </div>
                Image Preview
              </h3>
              {input && input.length > 0 && (
                <Button
                  variant={"destructive"}
                  className="h-8 w-8 p-0"
                  onClick={() => setInput(null)}
                >
                  <ImageMinus className="w-4 h-4" />
                </Button>
              )}
            </div>
            <Separator className="bg-gray-500" />
            {(!input || input.length === 0) && imageUrl && (
              <div className="relative w-full aspect-square overflow-hidden rounded-md">
                <Image
                  src={imageUrl ?? ""}
                  alt=""
                  fill
                  className="object-cover"
                />
              </div>
            )}
            {(!input || input.length === 0) && !imageUrl && (
              <div className="w-full aspect-square flex justify-center items-center rounded-md">
                <div className="flex flex-col items-center">
                  <ImagePlus className="w-20 h-20 stroke-1" />
                  <p className="font-semibold">No image previewed.</p>
                </div>
              </div>
            )}
            {input && input.length > 0 && (
              <div className="relative w-full aspect-square overflow-hidden rounded-md">
                <Image
                  src={URL.createObjectURL(input[0])}
                  alt=""
                  fill
                  className="object-cover"
                />
              </div>
            )}
          </Card>
        </div>
      </form>
    </div>
  );
};
