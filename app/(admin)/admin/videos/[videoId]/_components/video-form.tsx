"use client";

import Editor from "@/components/editor";
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
import { $Enums, Video } from "@prisma/client";
import axios from "axios";
import {
  ChevronDown,
  ImageIcon,
  ImageMinus,
  ImagePlus,
  NotebookPen,
  VideoIcon,
} from "lucide-react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, MouseEvent, useEffect, useState } from "react";
import { toast } from "sonner";

interface BlogsProps {
  initialData: {
    id?: string;
    title?: string;
    videoUrl?: string;
    createdAt?: Date | null;
    isPublish?: boolean;
    thumbnailUrl?: string;
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

export const VideoForm = ({ initialData }: BlogsProps) => {
  const [isMounted, setIsMounted] = useState(false);
  const [urlVideo, setUrlVideo] = useState("");
  const params = useParams();
  const router = useRouter();

  const urlImage = initialData?.thumbnailUrl ?? "";

  const title = initialData.id ? "Edit Video Form" : "Create Video Form";
  const label = initialData.id ? "Edit" : "Create";

  const [input, setInput] = useState<{
    title: string;
    videoUrl: string;
    category: string;
    isPublish: boolean;
    thumbnailUrl: FileList | null;
    cabang: string;
  }>({
    title: initialData?.title ?? "",
    videoUrl: initialData?.videoUrl ?? "",
    category: initialData?.category?.id ?? "",
    isPublish: initialData?.isPublish ?? false,
    thumbnailUrl: null,
    cabang: initialData?.profile?.id ?? "",
  });

  const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const onCheckUrl = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setUrlVideo(input.videoUrl);
  };

  const isValidUrl = input.videoUrl === urlVideo;

  const isValid =
    input.title !== "" &&
    input.videoUrl !== "" &&
    input.category !== "" &&
    (input.thumbnailUrl !== null || urlImage) &&
    (isValidUrl || initialData?.videoUrl);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const body = new FormData();
      if (input.thumbnailUrl) {
        body.append("thumbnailUrl", input.thumbnailUrl[0]);
      }
      if (initialData.admin) {
        body.append("profileId", input.cabang);
      }
      body.append("title", input.title);
      body.append("videoUrl", input.videoUrl);
      body.append("category", input.category);
      body.append("isPublish", input.isPublish.toString());

      if (!initialData.id) {
        // add
        axios
          .post("/api/admin/videos", body)
          .then((response) => {
            toast.success(response.data);
            router.push("/admin/videos");
            router.refresh();
          })
          .catch((error) => {
            console.log(error);
            toast.error(error.response.data);
          });
      } else {
        // edit
        axios
          .patch(`/api/admin/videos/${params.videoId}`, body)
          .then((response) => {
            toast.success(response.data);
            router.push("/admin/videos");
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
    setUrlVideo(initialData?.videoUrl ?? "");
  }, [initialData?.videoUrl]);

  if (!isMounted) {
    return null;
  }
  return (
    <div className="flex flex-col gap-y-2 w-full">
      <form
        onSubmit={onSubmit}
        className="flex w-full gap-4 flex-col lg:flex-row"
        encType="multipart/form-data"
      >
        <div className="lg:w-3/5 w-full">
          <Card className="flex flex-col w-full gap-y-4 p-3">
            <h3 className="text-lg font-semibold capitalize flex items-center">
              <div className="h-8 w-8 border rounded-full flex justify-center items-center border-black mr-2">
                <NotebookPen className="w-4 h-4" />
              </div>
              {title}
            </h3>
            <Separator className="bg-gray-500" />
            <div className="flex flex-col gap-y-2 w-full">
              <Label>Upload Thumbnail</Label>
              <Input
                type="file"
                onChange={(e) =>
                  setInput((prev) => ({
                    ...prev,
                    thumbnailUrl: e.target.files,
                  }))
                }
                name="thumbnailUrl"
              />
            </div>
            <div className="flex flex-col gap-y-2 w-full">
              <Label>Judul</Label>
              <Input
                placeholder="nama kategori"
                name="title"
                value={input.title}
                onChange={onChange}
              />
            </div>
            {initialData.admin && (
              <div className="flex flex-col gap-y-2 w-full">
                <Label>Pondok Kampus</Label>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      disabled={params.videoId !== "create"}
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
            <div className="flex gap-3 flex-col md:flex-row">
              <div className="flex flex-col gap-y-2 w-full">
                <Label>Kategori</Label>
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
              <div className="flex flex-col gap-y-2 w-full">
                <Label>Kode Video</Label>
                <div className="flex gap-x-2">
                  <Input
                    placeholder="Unique link video"
                    name="videoUrl"
                    value={input.videoUrl}
                    onChange={onChange}
                  />
                  <Button disabled={isValidUrl} onClick={onCheckUrl}>
                    Check
                  </Button>
                </div>
              </div>
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
        <div className="flex flex-col w-full lg:w-2/5 gap-y-4">
          <Card className="flex flex-col w-full gap-y-4 p-3">
            <h3 className="text-lg font-semibold capitalize flex items-center">
              <div className="h-8 w-8 border rounded-full flex justify-center items-center border-black mr-2">
                <VideoIcon className="w-4 h-4" />
              </div>
              Video Preview
            </h3>
            <Separator className="bg-gray-500" />
            <iframe
              src={`https://www.youtube.com/embed/${urlVideo}?vq=hd1080&modestbranding=1&rel=0&hl=id-ID`}
              className="w-full aspect-video rounded-md"
              title={input.title}
            />
          </Card>
          <Card className="flex flex-col w-full gap-y-4 p-3">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold capitalize flex items-center">
                <div className="h-8 w-8 border rounded-full flex justify-center items-center border-black mr-2">
                  <ImageIcon className="w-4 h-4" />
                </div>
                Thumbnail Preview
              </h3>
              {input.thumbnailUrl && (
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
            {!input.thumbnailUrl && urlImage !== "" && (
              <div className="relative w-full aspect-video overflow-hidden rounded-md">
                <Image src={urlImage} alt="" fill className="object-cover" />
              </div>
            )}
            {!input.thumbnailUrl && urlImage === "" && (
              <div className="w-full aspect-video flex justify-center items-center rounded-md">
                <div className="flex flex-col items-center">
                  <ImagePlus className="w-20 h-20 stroke-1" />
                  <p className="font-semibold">No image previewed.</p>
                </div>
              </div>
            )}
            {input.thumbnailUrl && (
              <div className="relative w-full aspect-video overflow-hidden rounded-md">
                <Image
                  src={URL.createObjectURL(input.thumbnailUrl[0])}
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
