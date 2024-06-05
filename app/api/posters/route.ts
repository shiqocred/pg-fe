import { db } from "@/lib/db";
import { paginateData } from "@/lib/paginate-data";
import { mapCabang } from "@/lib/utils";
import { formatDistanceStrict } from "date-fns";
import { NextResponse } from "next/server";
import { id as indonesia } from "date-fns/locale";

export async function GET(req: Request) {
  const { url } = req;
  const posters = await db.poster.findMany({
    where: {
      isPublish: true,
    },
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      title: true,
      posterUrl: true,
      createdAt: true,
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

  const formatedPosters = posters.map((item) => ({
    id: item.id,
    title: item.title,
    category: item.category.name,
    cabang:
      mapCabang
        .find((i) => i.value === item.profile.cabang)
        ?.kampus.split("-")
        .join(" ") ?? item.profile.cabang,
    posterUrl: item.posterUrl,
    date: formatDistanceStrict(
      item.createdAt.toString(),
      new Date().toString(),
      {
        addSuffix: true,
        locale: indonesia,
      }
    ),
  }));

  const paginatePosters = await paginateData(url, formatedPosters, 12);
  return NextResponse.json(
    {
      message: "Data matches",
      data: paginatePosters,
    },
    {
      status: 200,
    }
  );
}
