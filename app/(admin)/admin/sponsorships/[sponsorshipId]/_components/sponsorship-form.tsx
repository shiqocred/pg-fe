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
import { cn, mapCabang } from "@/lib/utils";
import { $Enums, Poster } from "@prisma/client";
import axios from "axios";
import {
  Check,
  ChevronDown,
  ImageIcon,
  ImageMinus,
  ImagePlus,
  NotebookPen,
} from "lucide-react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { toast } from "sonner";
import { SponsorshipsProps } from "../../page";
import { useCookies } from "next-client-cookies";

interface SponsorshipFormProps {
  initialData: {
    id?: string;
    name?: string;
    imageUrl?: string | null;
    href?: string | null;
    position?: $Enums.SponsorEnum;
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

export const SponsorshipForm = ({ initialData }: SponsorshipFormProps) => {
  const [isMounted, setIsMounted] = useState(false);
  const params = useParams();
  const router = useRouter();
  const cookies = useCookies();

  const title = initialData.id
    ? "Edit Sponsorship Form"
    : "Create Sponsorship Form";
  const label = initialData.id ? "Edit" : "Create";

  const urlImage = initialData?.imageUrl ?? "";

  const [input, setInput] = useState<{
    name: string;
    imageUrl: FileList | null;
    position: $Enums.SponsorEnum;
    href: string;
    cabang: string;
  }>({
    name: initialData?.name ?? "",
    href: initialData?.href ?? "",
    imageUrl: null,
    position: initialData?.position ?? "UTAMA",
    cabang: initialData.profile?.id ?? "",
  });

  const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const isValid = input.name !== "";

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const body = new FormData();
      if (input.imageUrl) {
        body.append("imageUrl", input.imageUrl[0]);
      }
      body.append("name", input.name);
      body.append("position", input.position);
      body.append("href", input.href);
      body.append("profileId", input.cabang);

      if (!initialData.id) {
        // add
        axios
          .post("/api/admin/sponsorships", body)
          .then((response) => {
            toast.success(response.data);
            router.push("/admin/sponsorships");
            cookies.set("updated", "updated");
            router.refresh();
          })
          .catch((error) => toast.error(error.response.data));
      } else {
        // edit
        axios
          .patch(`/api/admin/sponsorships/${params.sponsorshipId}`, body)
          .then((response) => {
            toast.success(response.data);
            router.push("/admin/sponsorships");
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
        className="flex w-full gap-4 flex-col-reverse md:flex-row"
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
              <Label>Upload Foto</Label>
              <Input
                type="file"
                onChange={(e) =>
                  setInput((prev) => ({ ...prev, imageUrl: e.target.files }))
                }
                accept="image/*"
                name="imageUrl"
              />
            </div>
            <div className="flex flex-col gap-y-2 w-full">
              <Label>Nama</Label>
              <Input
                placeholder="Nama Sponsorship..."
                name="name"
                value={input.name}
                onChange={onChange}
              />
            </div>
            <div className="flex flex-col gap-y-2 w-full">
              <Label>Link Sponsor</Label>
              <Input
                placeholder="etc 'https://www.google.com'"
                name="href"
                value={input.href}
                onChange={onChange}
              />
            </div>
            <div className="flex gap-3 flex-col md:flex-row">
              <div className="flex flex-col gap-y-2 w-full">
                <Label>Jabatan</Label>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      className="w-full justify-between"
                      variant={"outline"}
                    >
                      {input.position === "UTAMA" && "Sponsor utama"}
                      {input.position === "TUNGGAL" && "Sponsor tunggal"}
                      {input.position === "PENDAMPING1" &&
                        "Sponsor pendamping 1"}
                      {input.position === "PENDAMPING2" &&
                        "Sponsor pendamping 2"}
                      {input.position === "PENDAMPING3" &&
                        "Sponsor pendamping 3"}
                      <ChevronDown className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem
                      onClick={() =>
                        setInput((prev) => ({ ...prev, position: "UTAMA" }))
                      }
                    >
                      <Check
                        className={cn(
                          "w-4 h-4 mr-2 opacity-0",
                          input.position === "UTAMA" && "opacity-100"
                        )}
                      />
                      Sponsor utama
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() =>
                        setInput((prev) => ({ ...prev, position: "TUNGGAL" }))
                      }
                    >
                      <Check
                        className={cn(
                          "w-4 h-4 mr-2 opacity-0",
                          input.position === "TUNGGAL" && "opacity-100"
                        )}
                      />
                      Sponsor tunggal
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() =>
                        setInput((prev) => ({
                          ...prev,
                          position: "PENDAMPING1",
                        }))
                      }
                    >
                      <Check
                        className={cn(
                          "w-4 h-4 mr-2 opacity-0",
                          input.position === "PENDAMPING1" && "opacity-100"
                        )}
                      />
                      Sponsor pendamping 1
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() =>
                        setInput((prev) => ({
                          ...prev,
                          position: "PENDAMPING2",
                        }))
                      }
                    >
                      <Check
                        className={cn(
                          "w-4 h-4 mr-2 opacity-0",
                          input.position === "PENDAMPING2" && "opacity-100"
                        )}
                      />
                      Sponsor pendamping 2
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() =>
                        setInput((prev) => ({
                          ...prev,
                          position: "PENDAMPING3",
                        }))
                      }
                    >
                      <Check
                        className={cn(
                          "w-4 h-4 mr-2 opacity-0",
                          input.position === "PENDAMPING3" && "opacity-100"
                        )}
                      />
                      Sponsor pendamping 3
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              {initialData.admin && (
                <div className="flex flex-col gap-y-2 w-full">
                  <Label>Pondok Kampus</Label>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        disabled={params.sponsorshipId !== "create"}
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
                      {initialData.cabang
                        .slice(1, initialData.cabang.length)
                        .map((item) => (
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
              {input.imageUrl && (
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
                <div className="relative w-full aspect-square overflow-hidden rounded-md">
                  <Image src={urlImage} alt="" fill className="object-cover" />
                </div>
              )}
            {(!input.imageUrl || input.imageUrl.length === 0) &&
              urlImage === "" && (
                <div className="w-full aspect-square flex justify-center items-center rounded-md">
                  <div className="flex flex-col items-center">
                    <ImagePlus className="w-20 h-20 stroke-1" />
                    <p className="font-semibold">No image previewed.</p>
                  </div>
                </div>
              )}
            {input.imageUrl && input.imageUrl.length !== 0 && (
              <div className="relative w-full aspect-square overflow-hidden rounded-md">
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
      </form>
    </div>
  );
};
