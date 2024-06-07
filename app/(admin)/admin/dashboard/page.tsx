"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { mapCabang } from "@/lib/utils";
import { $Enums } from "@prisma/client";
import axios from "axios";
import {
  ArrowUpRight,
  BadgeDollarSign,
  Crown,
  ImagesIcon,
  Layers3,
  MonitorPlay,
  Newspaper,
  SquareLibrary,
} from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";

interface DashboardProps {
  profile: {
    cabang: $Enums.CabangRole;
    waktu: string | null;
    tanggal: string | null;
    tempat: string | null;
    heroUrl: string | null;
  }[];
  videos: {
    total: number;
    isPublish: number;
  };
  blogs: {
    total: number;
    isPublish: number;
  };
  posters: {
    total: number;
    isPublish: number;
  };
  category: {
    total: number;
  };
  photos: {
    total: number;
  };
  supervisors: {
    total: number;
    chiefs: number;
    staff: number;
  };
  sponsorships: {
    total: number;
    tunggal: number;
    utama: number;
    pendamping_1: number;
    pendamping_2: number;
    pendamping_3: number;
  };
}

const AdminPage = () => {
  const [data, setData] = useState<DashboardProps>();
  const [isOpen, setIsOpen] = useState<boolean>();
  const [urlImage, setUrlImage] = useState<string>("");

  const handleOpen = (data: string) => {
    setUrlImage(data);
    setIsOpen(true);
  };

  const handleGetDashboards = async () => {
    try {
      const res = await axios.get("/api/admin/dashboard");
      setData(res.data.data);
    } catch (error) {
      console.log(["ERROR_GET_DASHBOARD:"], error);
    }
  };

  useEffect(() => {
    handleGetDashboards();
  }, []);
  return (
    <div className="w-full h-full p-3 md:p-5 gap-5 flex flex-col">
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="p-2">
          <div className="w-full relatif object-cover aspect-square relative  rounded-md overflow-hidden">
            {urlImage && (
              <Image
                className="object-contain pointer-events-none"
                src={urlImage}
                alt=""
                fill
              />
            )}
          </div>
        </DialogContent>
      </Dialog>
      <div className="w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
        <Card className="w-full">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Categories</CardTitle>
            <Layers3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data?.category.total}</div>
            <p className="text-xs text-muted-foreground">Categories Created</p>
          </CardContent>
        </Card>
        <Card className="w-full">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Photos</CardTitle>
            <ImagesIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data?.photos.total}</div>
            <p className="text-xs text-muted-foreground">Photos Uploaded</p>
          </CardContent>
        </Card>
        <Card className="w-full">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Supervisors</CardTitle>
            <Crown className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data?.supervisors.total}</div>
            <p className="text-xs text-muted-foreground">
              Supervisors Uploaded
            </p>
          </CardContent>
        </Card>
        <div className="flex flex-col gap-5 h-full">
          <Card className="w-full h-[53px]">
            <CardHeader className="flex flex-row items-center justify-between h-full p-0 px-5 space-y-0">
              <CardTitle className="text-sm font-medium">
                Supervisor Chiefes
              </CardTitle>
              <div className="text-xl font-bold">
                {data?.supervisors.chiefs}
              </div>
            </CardHeader>
          </Card>
          <Card className="w-full h-[53px]">
            <CardHeader className="flex flex-row items-center justify-between h-full p-0 px-5 space-y-0">
              <CardTitle className="text-sm font-medium">
                Supervisor Chiefes
              </CardTitle>
              <div className="text-xl font-bold">{data?.supervisors.staff}</div>
            </CardHeader>
          </Card>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
        <div className="col-span-1 flex flex-col gap-5">
          <Card className="w-full">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Blogs</CardTitle>
              <Newspaper className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{data?.blogs.total}</div>
              <Badge className="text-xs bg-green-200 text-black font-normal rounded-md hover:bg-green-200">
                {data?.blogs.isPublish} isPublised
              </Badge>
            </CardContent>
          </Card>
          <Card className="w-full">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Videos</CardTitle>
              <MonitorPlay className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{data?.videos.total}</div>
              <Badge className="text-xs bg-green-200 text-black font-normal rounded-md hover:bg-green-200">
                {data?.videos.isPublish} isPublised
              </Badge>
            </CardContent>
          </Card>
          <Card className="w-full">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Posters</CardTitle>
              <SquareLibrary className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{data?.posters.total}</div>
              <Badge className="text-xs bg-green-200 text-black font-normal rounded-md hover:bg-green-200">
                {data?.posters.isPublish} isPublised
              </Badge>
            </CardContent>
          </Card>
        </div>
        <div className="col-span-1 flex flex-col gap-5">
          <Card className="w-full">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Sponsor</CardTitle>
              <BadgeDollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {data?.sponsorships.total}
              </div>
              <p className="text-xs text-muted-foreground">Sponsor Uploaded</p>
            </CardContent>
          </Card>
          <Card className="w-full h-[43.5px]">
            <CardHeader className="flex flex-row items-center justify-between h-full p-0 px-5 space-y-0">
              <CardTitle className="text-sm font-medium">
                Sponsor Tunggal
              </CardTitle>
              <div className="text-xl font-bold">
                {data?.sponsorships.tunggal}
              </div>
            </CardHeader>
          </Card>
          <Card className="w-full h-[43.5px]">
            <CardHeader className="flex flex-row items-center justify-between h-full p-0 px-5 space-y-0">
              <CardTitle className="text-sm font-medium">
                Sponsor Utama
              </CardTitle>
              <div className="text-xl font-bold">
                {data?.sponsorships.utama}
              </div>
            </CardHeader>
          </Card>
          <Card className="w-full h-[43.5px]">
            <CardHeader className="flex flex-row items-center justify-between h-full p-0 px-5 space-y-0">
              <CardTitle className="text-sm font-medium">
                Sponsor Pendamping 1
              </CardTitle>
              <div className="text-xl font-bold">
                {data?.sponsorships.pendamping_1}
              </div>
            </CardHeader>
          </Card>
          <Card className="w-full h-[43.5px]">
            <CardHeader className="flex flex-row items-center justify-between h-full p-0 px-5 space-y-0">
              <CardTitle className="text-sm font-medium">
                Sponsor Pendamping 2
              </CardTitle>
              <div className="text-xl font-bold">
                {data?.sponsorships.pendamping_2}
              </div>
            </CardHeader>
          </Card>
          <Card className="w-full h-[43.5px]">
            <CardHeader className="flex flex-row items-center justify-between h-full p-0 px-5 space-y-0">
              <CardTitle className="text-sm font-medium">
                Sponsor Pendamping 3
              </CardTitle>
              <div className="text-xl font-bold">
                {data?.sponsorships.pendamping_3}
              </div>
            </CardHeader>
          </Card>
        </div>
        <div className="col-span-1 md:col-span-2  w-full pb-20 xl:pb-10">
          <Card className="w-full p-3 ">
            <ScrollArea className="h-[483px] lg:h-[424px] ">
              <div className="gap-3 flex flex-col">
                {data &&
                  data.profile.length > 0 &&
                  data.profile.map((item) => (
                    <Card
                      className="border-none shadow-none p-2 bg-gray-100 rounded-md"
                      key={item.cabang}
                    >
                      <CardHeader className="flex flex-col h-full p-0 px-5 space-y-1">
                        <CardTitle className="text-sm font-medium">
                          {
                            mapCabang.find((i) => i.value === item.cabang)
                              ?.kampus
                          }
                        </CardTitle>
                        <Separator className="bg-gray-500" />
                      </CardHeader>
                      <CardContent className="py-1 text-xs text-gray-700 font-light gap-1 lg:gap-0">
                        <div className="flex flex-col lg:flex-row w-full gap-1 lg:gap-5">
                          <div className="flex items-center justify-between gap-3 w-full py-1">
                            <p>Hero Image:</p>
                            <p className="italic flex items-center">
                              {item.heroUrl ? "Uploaded" : "Not Uploaded"}
                              {item.heroUrl && (
                                <button
                                  onClick={() => handleOpen(item.heroUrl ?? "")}
                                >
                                  <ArrowUpRight className="w-3 h-3 ml-2" />
                                </button>
                              )}
                            </p>
                          </div>
                          <div className="flex items-center justify-between gap-3 w-full py-1">
                            <p>Tempat:</p>
                            <p className={!item.tempat ? "italic" : ""}>
                              {item.tempat ? item.tempat : "Not Updated"}
                            </p>
                          </div>
                        </div>
                        <div className="flex flex-col lg:flex-row w-full gap-1 lg:gap-5">
                          <div className="flex items-center justify-between gap-3 w-full py-1">
                            <p>Tanggal:</p>
                            <p className={!item.tanggal ? "italic" : ""}>
                              {item.tanggal ? item.tanggal : "Not Updated"}
                            </p>
                          </div>
                          <div className="flex items-center justify-between gap-3 w-full py-1">
                            <p>Time:</p>
                            <p className={!item.waktu ? "italic" : ""}>
                              {item.waktu ? item.waktu : "Not Updated"}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            </ScrollArea>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
