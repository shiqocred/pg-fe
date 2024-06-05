import { db } from "@/lib/db";
import { paginateData } from "@/lib/paginate-data";
import { mapCabang } from "@/lib/utils";
import { format, formatDistanceStrict } from "date-fns";
import { NextResponse } from "next/server";
import { id as indonesia } from "date-fns/locale";

export async function GET(
  req: Request,
  { params }: { params: { posterId: string } }
) {
  const blog = await db.poster.findFirst({
    where: {
      id: params.posterId,
    },
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

  const formatedBlog = {
    id: blog?.id,
    title: blog?.title,
    category: blog?.category.name,
    cabang:
      mapCabang
        .find((i) => i.value === blog?.profile.cabang)
        ?.kampus.split("-")
        .join(" ") ?? blog?.profile.cabang,
    posterUrl: blog?.posterUrl,
    date:
      blog?.createdAt &&
      format(blog.createdAt, "dd MMMM yyy", { locale: indonesia }),
  };

  const randomBlog = await db.poster.findMany({
    where: {
      isPublish: true,
    },
    select: {
      id: true,
    },
  });

  const randomExceptId = randomBlog.filter((item) => item.id !== blog?.id);

  const shuffled = randomExceptId.sort(() => 0.5 - Math.random());
  const selectedIds = shuffled.slice(0, 2).map((post) => post.id);

  const sugestedPost = await db.poster.findMany({
    where: {
      id: {
        in: selectedIds,
      },
    },
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

  const formatedSugested = sugestedPost.map((item) => ({
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

  return NextResponse.json(
    {
      message: "Data matches",
      data: formatedBlog,
      sugested_poster: formatedSugested,
    },
    {
      status: 200,
    }
  );
}
