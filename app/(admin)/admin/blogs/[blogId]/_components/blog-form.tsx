"use client";

import Editor from "@/components/editor";
import Preview from "@/components/preview";
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
import { Toggle } from "@/components/ui/toggle";
import { cn, mapCabang } from "@/lib/utils";
import { $Enums, Category, Post } from "@prisma/client";
import axios from "axios";
import {
  ChevronDown,
  Eye,
  EyeOff,
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

interface BlogsProps {
  initialData: {
    id?: string;
    title?: string;
    author?: string;
    highlight?: string;
    createdAt?: Date;
    isPublish?: boolean;
    imageUrl?: string;
    article?: string;
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

export const BlogsForm = ({ initialData }: BlogsProps) => {
  const [isMounted, setIsMounted] = useState(false);
  const params = useParams();
  const router = useRouter();
  const [isPreview, setIsPreview] = useState(false);
  const cookies = useCookies();

  const urlImage = initialData?.imageUrl ?? "";

  const title = initialData.id ? "Edit Article Form" : "Create Article Form";
  const label = initialData.id ? "Edit" : "Create";

  const [input, setInput] = useState<{
    title: string;
    author: string;
    highlight: string;
    category: string;
    cabang: string;
    article: string;
    isPublish: boolean;
    imageUrl: FileList | null;
  }>({
    title: initialData?.title ?? "",
    author: initialData?.author ?? "",
    highlight: initialData?.highlight ?? "",
    category: initialData?.category?.id ?? "",
    cabang: initialData?.profile?.id ?? "",
    article: initialData?.article ?? "",
    isPublish: initialData?.isPublish ?? false,
    imageUrl: null,
  });

  const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const body = new FormData();
      if (input.imageUrl && input.imageUrl.length > 0) {
        body.append("imageUrl", input.imageUrl[0]);
      }
      if (initialData.admin) {
        body.append("profileId", input.cabang);
      }
      body.append("title", input.title);
      body.append("author", input.author);
      body.append("highlight", input.highlight);
      body.append("category", input.category);
      body.append("article", input.article);
      body.append("isPublish", input.isPublish.toString());

      if (!initialData.id) {
        //     // add
        axios
          .post("/api/admin/blogs", body)
          .then((response) => {
            toast.success(response.data);
            router.push("/admin/blogs");
            cookies.set("updated", "updated");
            router.refresh();
          })
          .catch((error) => toast.error(error.response.data));
      } else {
        // edit
        axios
          .patch(`/api/admin/blogs/${params.blogId}`, body)
          .then((response) => {
            toast.success(response.data);
            router.push("/admin/blogs");
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
    if (!isMounted) {
      setIsMounted(true);
    }
  }, []);

  if (!isMounted) {
    return null;
  }
  return (
    <div className="flex flex-col gap-y-2 w-full">
      <form
        onSubmit={onSubmit}
        className="flex flex-col gap-4"
        encType="multipart/form-data"
      >
        <div className="w-full flex gap-3 flex-col-reverse lg:flex-row">
          <div className="w-full lg:w-3/5">
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
                    setInput((prev) => ({ ...prev, imageUrl: e.target.files }))
                  }
                  name="imageUrl"
                  accept="image/*"
                />
              </div>
              <div className="flex flex-col gap-y-2 w-full">
                <Label>Judul</Label>
                <Input
                  placeholder="Title..."
                  name="title"
                  value={input.title}
                  onChange={onChange}
                />
              </div>
              <div className="flex flex-col gap-y-2 w-full">
                <Label>Highlight</Label>
                <Textarea
                  placeholder="Highlight..."
                  name="highlight"
                  value={input.highlight}
                  onChange={onChange}
                />
              </div>
              {initialData.admin && (
                <div className="flex flex-col gap-y-2 w-full">
                  <Label>Pondok Kampus</Label>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        disabled={params.blogId !== "create"}
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
                  <Label>Author</Label>
                  <Input
                    placeholder="Author..."
                    name="author"
                    value={input.author}
                    onChange={onChange}
                  />
                </div>
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
              </div>
              <div className="flex gap-3">
                <div className="flex flex-col gap-y-2 w-full">
                  <Label>Status</Label>
                  <Card
                    className={cn(
                      "p-2 w-full",
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
                </div>
                <div className="flex flex-col gap-y-2 w-full">
                  <Label>Article</Label>
                  <Toggle
                    className="w-full justify-start"
                    variant={"outline"}
                    pressed={isPreview}
                    onPressedChange={setIsPreview}
                  >
                    {isPreview ? (
                      <EyeOff className="w-4 h-4 mr-2" />
                    ) : (
                      <Eye className="w-4 h-4 mr-2" />
                    )}
                    {isPreview ? "Edit" : "Preview"}
                  </Toggle>
                </div>
              </div>
            </Card>
          </div>
          <div className="w-full lg:w-2/5">
            <Card className="flex flex-col w-full gap-y-4 p-3">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold capitalize flex items-center">
                  <div className="h-8 w-8 border rounded-full flex justify-center items-center border-black mr-2">
                    <ImageIcon className="w-4 h-4" />
                  </div>
                  Image Preview
                </h3>
                {input.imageUrl && input.imageUrl.length > 0 && (
                  <Button
                    variant={"destructive"}
                    className="h-8 w-8 p-0"
                    onClick={() =>
                      setInput((prev) => ({ ...prev, imageUrl: null }))
                    }
                  >
                    <ImageMinus className="w-4 h-4" />
                  </Button>
                )}
              </div>
              <Separator className="bg-gray-500" />
              {(!input.imageUrl || input.imageUrl.length === 0) &&
                urlImage !== "" && (
                  <div className="relative w-full aspect-video overflow-hidden rounded-md">
                    <Image
                      src={urlImage}
                      alt=""
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
              {(!input.imageUrl || input.imageUrl.length === 0) &&
                urlImage === "" && (
                  <div className="w-full aspect-video flex justify-center items-center rounded-md">
                    <div className="flex flex-col items-center">
                      <ImagePlus className="w-20 h-20 stroke-1" />
                      <p className="font-semibold">No image previewed.</p>
                    </div>
                  </div>
                )}
              {input.imageUrl && input.imageUrl.length > 0 && (
                <div className="relative w-full aspect-video overflow-hidden rounded-md">
                  <Image
                    src={URL.createObjectURL(input.imageUrl[0])}
                    alt=""
                    fill
                    className="object-cover"
                  />
                </div>
              )}
            </Card>
          </div>
        </div>
        <div className="min-h-[320px] h-full">
          {isPreview ? (
            <div className="h-full w-full border rounded-md">
              <Preview value={input.article} />
            </div>
          ) : (
            <Editor
              value={input.article}
              onChange={(e) => setInput((prev) => ({ ...prev, article: e }))}
            />
          )}
        </div>
        <Button className="mt-2">{label}</Button>
      </form>
    </div>
  );
};
