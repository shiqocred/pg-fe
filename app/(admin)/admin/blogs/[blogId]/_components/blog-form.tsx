"use client";

import Editor from "@/components/editor";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { CabangRole, Category, Post } from "@prisma/client";
import axios from "axios";
import { ChevronDown } from "lucide-react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { z } from "zod";

interface BlogsProps {
  initialData: Post | null;
  categories: {
    profile: {
      branches: {
        id: string;
        cabang: CabangRole;
      } | null;
    };
    id: string;
    name: string;
    profileId: string;
  }[];
}

export const BlogsForm = ({ initialData, categories }: BlogsProps) => {
  const [isMounted, setIsMounted] = useState(false);
  const params = useParams();
  const router = useRouter();

  const urlImage = initialData?.imageUrl ?? "";

  const title = initialData ? "Edit Article Form" : "Create Article Form";
  const label = initialData ? "Edit" : "Create";

  const [input, setInput] = useState<{
    title: string;
    author: string;
    highlight: string;
    category: string;
    article: string;
    imageUrl: FileList | null;
  }>({
    title: initialData?.title ?? "",
    author: initialData?.author ?? "",
    highlight: initialData?.highlight ?? "",
    category: initialData?.categoryId ?? "",
    article: initialData?.article ?? "",
    imageUrl: null,
  });

  const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (!initialData) {
        //     // add
        const body = new FormData();
        if (input.imageUrl) {
          body.append("imageUrl", input.imageUrl[0]);
        }
        body.append("title", input.title),
          body.append("author", input.author),
          body.append("highlight", input.highlight),
          body.append("category", input.category),
          body.append("article", input.article),
          axios
            .post("/api/admin/blogs", body)
            .then((response) => {
              toast.success(response.data);
              router.push("/admin/blogs");
              router.refresh();
            })
            .catch((error) => toast.error(error.response.data));
      } else {
        // edit
        const body = new FormData();
        if (input.imageUrl) {
          body.append("imageUrl", input.imageUrl[0]);
        }
        body.append("title", input.title),
          body.append("author", input.author),
          body.append("highlight", input.highlight),
          body.append("category", input.category),
          body.append("article", input.article),
          axios
            .patch(`/api/admin/blogs/${params.blogId}`, body)
            .then((response) => {
              toast.success(response.data);
              router.push("/admin/blogs");
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
      {title}
      <form
        onSubmit={onSubmit}
        className="flex flex-col gap-4"
        encType="multipart/form-data"
      >
        <div className="flex w-full gap-4">
          <div className="flex flex-col w-full gap-y-4">
            <Input
              placeholder="nama kategori"
              name="title"
              value={input.title}
              onChange={onChange}
            />
            <Input
              placeholder="author..."
              name="author"
              value={input.author}
              onChange={onChange}
            />
            <Input
              type="file"
              onChange={(e) =>
                setInput((prev) => ({ ...prev, imageUrl: e.target.files }))
              }
              name="imageUrl"
            />
            {!input.imageUrl && urlImage !== "" && (
              <div className="relative w-20 h-16 overflow-hidden rounded-md">
                <Image src={urlImage} alt="" fill className="object-cover" />
              </div>
            )}
            {input.imageUrl && (
              <div className="relative w-20 h-16 overflow-hidden rounded-md">
                <Image
                  src={URL.createObjectURL(input.imageUrl[0])}
                  alt=""
                  fill
                  className="object-cover"
                />
              </div>
            )}
          </div>
          <div className="flex flex-col w-full gap-y-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="w-full justify-between" variant={"outline"}>
                  {categories.find((item) => item.id === input.category)
                    ?.name ?? "Pilih kategori..."}
                  <ChevronDown className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {categories.map((item) => (
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
            <Textarea
              placeholder="nama kategori"
              name="highlight"
              value={input.highlight}
              onChange={onChange}
            />
          </div>
        </div>
        <Editor
          value={input.article}
          onChange={(e) => setInput((prev) => ({ ...prev, article: e }))}
        />
        <Button className="mt-2">{label}</Button>
      </form>
    </div>
  );
};
