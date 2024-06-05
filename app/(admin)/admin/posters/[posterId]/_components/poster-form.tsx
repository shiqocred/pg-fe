"use client";

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

interface PostersProps {
  initialData: {
    id?: string;
    title?: string;
    posterUrl?: string;
    createdAt?: Date | null;
    isPublish?: boolean;
    admin: boolean;
    profile?: {
      id: string;
      cabang: string;
    };
    category?: {
      id: string;
      name: string;
    };
    categories: {
      id: string;
      name: string;
      profile: {
        id: string;
        cabang: $Enums.CabangRole;
      };
      profileId: string;
    }[];
    cabang: {
      id: string;
      cabang: $Enums.CabangRole;
    }[];
  };
}

export const PosterForm = ({ initialData }: PostersProps) => {
  const [isMounted, setIsMounted] = useState(false);
  const params = useParams();
  const router = useRouter();
  const cookies = useCookies();

  const title = initialData.id ? "Edit Poster Form" : "Create Poster Form";
  const label = initialData.id ? "Edit" : "Create";

  const urlImage = initialData?.posterUrl ?? "";

  const [input, setInput] = useState<{
    title: string;
    posterUrl: FileList | null;
    category: string;
    isPublish: boolean;
    cabang: string;
  }>({
    title: initialData?.title ?? "",
    posterUrl: null,
    category: initialData?.category?.id ?? "",
    isPublish: initialData?.isPublish ?? false,
    cabang: initialData?.profile?.id ?? "",
  });

  const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const isValid = input.title !== "" && input.category !== "";

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const body = new FormData();
      if (input.posterUrl && input.posterUrl.length > 0) {
        body.append("posterUrl", input.posterUrl[0]);
      }
      if (initialData.admin) {
        body.append("profileId", input.cabang);
      }
      body.append("title", input.title);
      body.append("category", input.category);
      body.append("isPublish", input.isPublish.toString());

      if (!initialData.id) {
        // add
        axios
          .post("/api/admin/posters", body)
          .then((response) => {
            toast.success(response.data);
            router.push("/admin/posters");
            cookies.set("updated", "updated");
            router.refresh();
          })
          .catch((error) => toast.error(error.response.data));
      } else {
        // edit
        axios
          .patch(`/api/admin/posters/${params.posterId}`, body)
          .then((response) => {
            toast.success(response.data);
            router.push("/admin/posters");
            cookies.set("updated", "updated");
            router.refresh();
          })
          .catch((error) => toast.error(error.response.data));
      }
    } catch (error) {
      toast.success("Something went wrong");
    }
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }
  return (
    <div className="flex flex-col gap-y-2 w-full">
      <form
        onSubmit={onSubmit}
        className="flex w-full gap-4 flex-col md:flex-row"
        encType="multipart/form-data"
      >
        <div className="w-full lg:w-2/3">
          <Card className="flex flex-col w-full gap-y-4 p-3">
            <h3 className="text-lg font-semibold capitalize flex items-center">
              <div className="h-8 w-8 border rounded-full flex justify-center items-center border-black mr-2">
                <NotebookPen className="w-4 h-4" />
              </div>
              {title}
            </h3>
            <Separator className="bg-gray-500" />
            <div className="flex flex-col gap-y-2 w-full">
              <Label>Upload poster</Label>
              <Input
                type="file"
                onChange={(e) =>
                  setInput((prev) => ({ ...prev, posterUrl: e.target.files }))
                }
                name="posterUrl"
                accept="image/*"
              />
            </div>
            <div className="flex flex-col gap-y-2 w-full">
              <Label>Title</Label>
              <Input
                placeholder="title..."
                name="title"
                value={input.title}
                onChange={onChange}
              />
            </div>
            <div className="w-full items-center flex gap-4 flex-col md:flex-row">
              <div className="flex flex-col gap-y-2 w-full">
                <Label>Category</Label>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      className="w-full justify-between"
                      variant={"outline"}
                    >
                      {initialData.categories.find(
                        (item) => item.id === input.category
                      )?.name ?? "Pilih kategori..."}
                      <ChevronDown className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    {initialData.categories.map((item) => (
                      <DropdownMenuItem
                        key={item.id}
                        onClick={() =>
                          setInput((prev) => ({ ...prev, category: item.id }))
                        }
                      >
                        {item.name}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              {initialData.admin && (
                <div className="flex flex-col gap-y-2 w-full">
                  <Label>Pondok Kampus</Label>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        disabled={params.posterId !== "create"}
                        className="w-full justify-between capitalize disabled:opacity-100"
                        variant={"outline"}
                      >
                        {mapCabang
                          .find(
                            (i) =>
                              i.value ===
                              initialData.cabang.find(
                                (item) => item.id === input.cabang
                              )?.cabang
                          )
                          ?.label.split("-")
                          .join(" ") ?? "Pilih kampus..."}
                        <ChevronDown className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      {initialData.cabang.map((item) => (
                        <DropdownMenuItem
                          key={item.id}
                          onClick={() =>
                            setInput((prev) => ({
                              ...prev,
                              cabang: item.id,
                            }))
                          }
                          className="capitalize"
                        >
                          {mapCabang
                            .find((i) => i.value === item.cabang)
                            ?.label.split("-")
                            .join(" ")}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              )}
            </div>
            <Card
              className={cn(
                "p-2",
                input.isPublish ? "bg-green-50" : "bg-gray-50"
              )}
            >
              <Label className="flex items-center gap-x-2">
                <Switch
                  checked={input.isPublish}
                  onCheckedChange={(e) =>
                    setInput((prev) => ({ ...prev, isPublish: e }))
                  }
                />
                <span>{input.isPublish ? "Publish" : "Draft"}</span>
              </Label>
            </Card>
            <Button className="mt-2" disabled={!isValid}>
              {label}
            </Button>
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
              {input.posterUrl && input.posterUrl.length > 0 && (
                <Button
                  variant={"destructive"}
                  className="h-8 w-8 p-0"
                  onClick={() =>
                    setInput((prev) => ({ ...prev, posterUrl: null }))
                  }
                >
                  <ImageMinus className="w-4 h-4" />
                </Button>
              )}
            </div>
            <Separator className="bg-gray-500" />
            {(!input.posterUrl || input.posterUrl.length === 0) &&
              urlImage !== "" && (
                <div className="relative w-full aspect-[70/99] overflow-hidden rounded-md">
                  <Image src={urlImage} alt="" fill className="object-cover" />
                </div>
              )}
            {(!input.posterUrl || input.posterUrl.length === 0) &&
              urlImage === "" && (
                <div className="w-full aspect-[70/99] flex justify-center items-center rounded-md">
                  <div className="flex flex-col items-center">
                    <ImagePlus className="w-20 h-20 stroke-1" />
                    <p className="font-semibold">No image previewed.</p>
                  </div>
                </div>
              )}
            {input.posterUrl && input.posterUrl.length !== 0 && (
              <div className="relative w-full aspect-[70/99] overflow-hidden rounded-md">
                <Image
                  src={URL.createObjectURL(input.posterUrl[0])}
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
