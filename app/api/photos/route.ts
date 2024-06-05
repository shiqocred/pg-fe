import { db } from "@/lib/db";
import { paginateData } from "@/lib/paginate-data";
import { mapCabang } from "@/lib/utils";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { url } = req;
  const photos = await db.photo.findMany({
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      imageUrl: true,
      profile: {
        select: {
          id: true,
          cabang: true,
        },
      },
    },
  });

  const formatedPhoto = photos.map((item) => ({
    id: item.id,
    imageUrl: item.imageUrl,
    cabang:
      mapCabang
        .find((i) => i.value === item.profile.cabang)
        ?.kampus.split("-")
        .join(" ") ?? item.profile.cabang,
  }));

  return NextResponse.json(
    {
      message: "Data matches",
      data: formatedPhoto,
    },
    {
      status: 200,
    }
  );
}
