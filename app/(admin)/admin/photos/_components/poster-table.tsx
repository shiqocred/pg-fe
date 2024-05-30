"use client";

import React, { MouseEvent, useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Trash2,
  PlusCircle,
  DatabaseBackup,
  ArrowRightLeft,
  ChevronDown,
  Minus,
  Check,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import { $Enums } from "@prisma/client";
import { getHero } from "@/actions/get-hero";
import { getProfiles } from "@/actions/get-profiles";
import { getPhotos } from "@/actions/get-photos";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn, mapCabang } from "@/lib/utils";
import { Checkbox } from "@/components/ui/checkbox";
import { useModal } from "@/hooks/use-modal";
import { useCookies } from "next-client-cookies";
import { db } from "@/lib/db";
import { getProfileIdFromCabang } from "@/actions/get-profile-id-from-cabang";

interface initialData {
  heroUrl: string | null | undefined;
  photos: (string | null)[];
}

export const VideoTable = ({
  userId,
  isAdmin,
}: {
  userId: string;
  isAdmin: boolean;
}) => {
  const [isMounted, setIsMounted] = useState(false);
  const { onOpen } = useModal();
  const cookies = useCookies();

  const [urlImage, setUrlImage] = useState("");
  const [urlPhotos, setUrlPhotos] = useState<
    {
      profile: {
        id: string;
        cabang: $Enums.CabangRole;
      };
      id: string;
      imageUrl: string | null;
    }[]
  >([]);

  const [cabang, setCabang] = useState<$Enums.CabangRole>("PUTRA1");

  const [destroyIds, setDestroyIds] = useState<string[]>([]);

  const [isAll, setIsAll] = useState<"nothing" | "partial" | "all">("nothing");

  const handleAllSelect = (
    e: MouseEvent<HTMLButtonElement>,
    current: string
  ) => {
    e.preventDefault();
    if (current === "nothing") {
      setDestroyIds(urlPhotos.map((item) => item.id));
      return setIsAll("all");
    } else if (current === "partial" || current === "all") {
      setDestroyIds([]);
      return setIsAll("nothing");
    }
  };

  const getHeroImage = async () => {
    const profileId = await getProfileIdFromCabang(cabang);

    const heroRes = await getHero(isAdmin && profileId ? profileId.id : userId);

    setUrlImage(heroRes?.heroUrl ?? "");
  };
  const getPhotosRes = async () => {
    const profileId = await getProfileIdFromCabang(cabang);

    const photoRes = await getPhotos(
      isAdmin && profileId ? profileId.id : userId
    );

    setUrlPhotos(photoRes);
  };

  useEffect(() => {
    if (destroyIds.length === 0) {
      setIsAll("nothing");
    }
    if (destroyIds.length > 0 && destroyIds.length < urlPhotos.length) {
      setIsAll("partial");
    }
    if (destroyIds.length === urlPhotos.length) {
      setIsAll("all");
    }
  }, [destroyIds, urlPhotos.length]);

  useEffect(() => {
    getHeroImage();
    getPhotosRes();
    setDestroyIds([]);
    if (cookies.get("deleted")) {
      cookies.remove("deleted");
    }
  }, [cabang, cookies.get("deleted")]);

  useEffect(() => {
    setIsMounted(true);
    getHeroImage();
    getPhotosRes();
  }, []);

  if (!isMounted) {
    return null;
  }
  return (
    <div className="flex flex-col gap-4">
      {isAdmin && (
        <Card className="flex md:items-center md:justify-between px-2 md:px-5 py-2 gap-2 bg-gray-200 flex-col md:flex-row mb-10 md:mb-5">
          <p className="text-gray-700 text-sm">Silahkan pilih kampus!</p>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="justify-between capitalize gap-4">
                {mapCabang
                  .find((item) => item.value === cabang)
                  ?.label.split("-")
                  .join(" ")}
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
        </Card>
      )}
      <div className="flex gap-4 flex-col md:flex-row">
        <div className="flex flex-col w-full md:w-1/3 lg:w-1/4">
          <div className="flex w-full justify-between items-center mb-3">
            <h3 className="text-lg font-semibold">Hero Photo</h3>
            <Link href="/admin/photos/hero">
              <Button className="h-9">
                <ArrowRightLeft className="w-4 h-4 mr-2" />
                Change
              </Button>
            </Link>
          </div>
          <div className="relative w-full aspect-square rounded-md overflow-hidden border">
            {urlImage && <Image className="" src={urlImage} alt="" fill />}
            {!urlImage && (
              <Image className="" src={"/images/main_image.jpg"} alt="" fill />
            )}
          </div>
        </div>
        <div className="flex flex-col w-full md:w-2/3 lg:w-3/4">
          <div className="flex w-full justify-between items-center mb-3">
            <h3 className="text-lg font-semibold">BTS Photos</h3>
            <Link href="/admin/photos/upload">
              <Button className="h-9">
                <PlusCircle className="w-4 h-4 mr-2" />
                Add New Photo
              </Button>
            </Link>
          </div>
          {urlPhotos.length !== 0 ? (
            <div className="flex flex-col w-full gap-3 p-3 rounded-lg border">
              <Card className="rounded text-sm px-3 py-1 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Button
                    className={cn(
                      "w-5 h-5 p-0 rounded bg-transparent border border-black ",
                      isAll === "all"
                        ? "bg-black hover:bg-black"
                        : " bg-transparent hover:bg-transparent"
                    )}
                    onClick={(e) => handleAllSelect(e, isAll)}
                  >
                    {isAll === "partial" && (
                      <Minus className="w-3 h-3 text-black" />
                    )}
                    {isAll === "all" && (
                      <Check className="w-3 h-3 text-white" />
                    )}
                  </Button>
                  <p>{destroyIds.length} Dipilih</p>
                </div>
                <Button
                  disabled={destroyIds.length === 0}
                  className="p-0 w-8 h-8 bg-red-100 hover:bg-red-200/70 text-red-500"
                  onClick={() => onOpen("delete-photos", "", destroyIds)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </Card>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
                {urlPhotos.map((item) => (
                  <Card key={item.id} className="col-span-1  flex flex-col">
                    <div className="relative w-full aspect-square rounded overflow-hidden shadow">
                      <Checkbox
                        className="w-5 h-5 absolute top-2 left-2 z-10 bg-white data-[state=checked]:bg-white data-[state=checked]:text-black"
                        checked={destroyIds.includes(item.id)}
                        onCheckedChange={(e) => {
                          e
                            ? setDestroyIds((prev) => [...prev, item.id])
                            : setDestroyIds((prev) =>
                                prev.filter((i) => i !== item.id)
                              );
                        }}
                      />
                      <Image
                        src={item.imageUrl ?? ""}
                        fill
                        alt=""
                        className="object-cover"
                      />
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center p-3 rounded-lg border min-h-[200px]">
              <div className="flex flex-col items-center gap-3">
                <DatabaseBackup className="w-20 h-20 stroke-[1.5]" />
                <p className="font-semibold">No photos listed.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
