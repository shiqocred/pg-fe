import { db } from "@/lib/db";
import { paginateData } from "@/lib/paginate-data";
import { mapCabang } from "@/lib/utils";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { gontorId: string } }
) {
  const current =
    mapCabang.find((item) => item.label === params.gontorId)?.slug ?? "";

  const cabangParams = current.toString().includes("putri")
    ? current.toString().split("-")[1].toUpperCase() +
      current.toString().split("-")[2].toUpperCase()
    : "PUTRA" + current.toString().split("-")[1].toUpperCase();
  const { url } = req;
  const photos = await db.photo.findMany({
    where: {
      profile: {
        cabang: cabangParams as any,
      },
    },
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
