import { db } from "@/lib/db";
import { paginateData } from "@/lib/paginate-data";
import { mapCabang } from "@/lib/utils";
import { formatDistanceStrict } from "date-fns";
import { NextResponse } from "next/server";
import { id as indonesia } from "date-fns/locale";

export async function GET(req: Request) {
  const { url } = req;
  const blogs = await db.post.findMany({
    where: {
      isPublish: true,
    },
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      title: true,
      author: true,
      highlight: true,
      createdAt: true,
      isPublish: true,
      imageUrl: true,
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

  const formatedBlogs = blogs.map((item) => ({
    id: item.id,
    title: item.title,
    category: item.category.name,
    author: item.author,
    cabang:
      mapCabang
        .find((i) => i.value === item.profile.cabang)
        ?.kampus.split("-")
        .join(" ") ?? item.profile.cabang,
    highlight: item.highlight,
    imageUrl: item.imageUrl,
    date: formatDistanceStrict(
      item.createdAt.toString(),
      new Date().toString(),
      {
        addSuffix: true,
        locale: indonesia,
      }
    ),
  }));

  const paginateBlogs = await paginateData(url, formatedBlogs, 12);
  return NextResponse.json(
    {
      message: "Data matches",
      data: paginateBlogs,
    },
    {
      status: 200,
    }
  );
}
