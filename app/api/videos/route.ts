import { db } from "@/lib/db";
import { paginateData } from "@/lib/paginate-data";
import { mapCabang } from "@/lib/utils";
import { formatDistanceStrict } from "date-fns";
import { NextResponse } from "next/server";
import { id as indonesia } from "date-fns/locale";

export async function GET(req: Request) {
  const { url } = req;
  const videos = await db.video.findMany({
    where: {
      isPublish: true,
    },
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      title: true,
      videoUrl: true,
      createdAt: true,
      thumbnailUrl: true,
      profile: {
        select: {
          id: true,
          cabang: true,
        },
      },
      category: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });

  const formatedVideo = videos.map((item) => ({
    id: item.id,
    title: item.title,
    category: item.category.name,
    videoUrl: item.videoUrl,
    thumbnailUrl: item.thumbnailUrl,
    cabang:
      mapCabang
        .find((i) => i.value === item.profile.cabang)
        ?.kampus.split("-")
        .join(" ") ?? item.profile.cabang,
    date: formatDistanceStrict(
      item.createdAt.toString(),
      new Date().toString(),
      {
        addSuffix: true,
        locale: indonesia,
      }
    ),
  }));

  const paginateVideos = await paginateData(url, formatedVideo, 12);
  return NextResponse.json(
    {
      message: "Data matches",
      data: paginateVideos,
    },
    {
      status: 200,
    }
  );
}
