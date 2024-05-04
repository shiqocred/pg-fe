"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { $Enums, Poster } from "@prisma/client";
import axios from "axios";
import { ChevronDown } from "lucide-react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { toast } from "sonner";

interface PostersProps {
  initialData: Poster | null;
  categories: {
    profile: {
      id: string;
      cabang: $Enums.CabangRole;
    };
    id: string;
    profileId: string;
    name: string;
  }[];
}

export const PosterForm = ({ initialData, categories }: PostersProps) => {
  const [isMounted, setIsMounted] = useState(false);
  const params = useParams();
  const router = useRouter();

  const title = initialData ? "Edit Poster Form" : "Create Poster Form";
  const label = initialData ? "Edit" : "Create";

  const urlImage = initialData?.posterUrl ?? "";

  const [input, setInput] = useState<{
    title: string;
    description: string;
    posterUrl: FileList | null;
    category: string;
    isPublish: boolean;
  }>({
    title: initialData?.title ?? "",
    description: initialData?.description ?? "",
    posterUrl: null,
    category: initialData?.categoryId ?? "",
    isPublish: initialData?.isPublish ?? false,
  });

  const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const isValid =
    input.title !== "" && input.description !== "" && input.category !== "";

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const body = new FormData();
      if (input.posterUrl) {
        body.append("posterUrl", input.posterUrl[0]);
      }
      body.append("title", input.title);
      body.append("description", input.description);
      body.append("category", input.category);
      body.append("isPublish", input.isPublish.toString());

      if (!initialData) {
        // add
        axios
          .post("/api/admin/posters", body)
          .then((response) => {
            toast.success(response.data);
            router.push("/admin/posters");
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
        className="flex w-full gap-4"
        encType="multipart/form-data"
      >
        <div className="flex flex-col w-full gap-y-4">
          <Input
            placeholder="nama kategori"
            name="title"
            value={input.title}
            onChange={onChange}
          />
          <Textarea
            placeholder="description..."
            name="description"
            value={input.description}
            onChange={onChange}
          />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="w-full justify-between" variant={"outline"}>
                {categories.find((item) => item.id === input.category)?.name ??
                  "Pilih kategori..."}
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
          <Label className="flex items-center gap-x-2">
            <Switch
              checked={input.isPublish}
              onCheckedChange={(e) =>
                setInput((prev) => ({ ...prev, isPublish: e }))
              }
            />
            <span>Publish</span>
          </Label>
          <Button className="mt-2" disabled={!isValid}>
            {label}
          </Button>
        </div>
        <div className="flex flex-col w-full gap-y-4">
          <Input
            type="file"
            onChange={(e) =>
              setInput((prev) => ({ ...prev, posterUrl: e.target.files }))
            }
            name="posterUrl"
          />
          {!input.posterUrl && urlImage !== "" && (
            <div className="relative w-full aspect-square overflow-hidden rounded-md">
              <Image src={urlImage} alt="" fill className="object-cover" />
            </div>
          )}
          {input.posterUrl && (
            <div className="relative w-full aspect-square overflow-hidden rounded-md">
              <Image
                src={URL.createObjectURL(input.posterUrl[0])}
                alt=""
                fill
                className="object-cover"
              />
            </div>
          )}
        </div>
      </form>
    </div>
  );
};
