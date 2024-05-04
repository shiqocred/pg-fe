"use client";

import Editor from "@/components/editor";
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
import { $Enums, Video } from "@prisma/client";
import axios from "axios";
import { ChevronDown } from "lucide-react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, MouseEvent, useEffect, useState } from "react";
import { toast } from "sonner";

interface BlogsProps {
  initialData: Video | null;
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

export const VideoForm = ({ initialData, categories }: BlogsProps) => {
  const [isMounted, setIsMounted] = useState(false);
  const [urlVideo, setUrlVideo] = useState("");
  const params = useParams();
  const router = useRouter();

  const title = initialData ? "Edit Video Form" : "Create Video Form";
  const label = initialData ? "Edit" : "Create";

  const [input, setInput] = useState<{
    title: string;
    description: string;
    videoUrl: string;
    category: string;
    isPublish: boolean;
  }>({
    title: initialData?.title ?? "",
    description: initialData?.description ?? "",
    videoUrl: initialData?.videoUrl ?? "",
    category: initialData?.categoryId ?? "",
    isPublish: initialData?.isPublish ?? false,
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
    input.description !== "" &&
    input.videoUrl !== "" &&
    input.category !== "" &&
    isValidUrl;

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const body = {
        title: input.title,
        description: input.description,
        videoUrl: input.videoUrl,
        category: input.category,
        isPublish: input.isPublish,
      };

      if (!initialData) {
        // add
        axios
          .post("/api/admin/videos", body)
          .then((response) => {
            toast.success(response.data);
            router.push("/admin/videos");
            router.refresh();
          })
          .catch((error) => toast.error(error.response.data));
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
          <iframe
            src={`https://www.youtube.com/embed/${urlVideo}?vq=hd1080&modestbranding=1&rel=0&hl=id-ID`}
            className="w-full aspect-video rounded-md"
            title={input.title}
          />
        </div>
      </form>
    </div>
  );
};
