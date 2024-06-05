import { db } from "@/lib/db";
import { paginateData } from "@/lib/paginate-data";
import { mapCabang } from "@/lib/utils";
import { format, formatDistanceStrict } from "date-fns";
import { NextResponse } from "next/server";
import { id as indonesia } from "date-fns/locale";

export async function GET(
  req: Request,
  { params }: { params: { blogId: string } }
) {
  const blog = await db.post.findFirst({
    where: {
      id: params.blogId,
    },
    select: {
      id: true,
      title: true,
      author: true,
      createdAt: true,
      imageUrl: true,
      article: true,
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
    author: blog?.author,
    article: blog?.article,
    cabang:
      mapCabang
        .find((i) => i.value === blog?.profile.cabang)
        ?.kampus.split("-")
        .join(" ") ?? blog?.profile.cabang,
    imageUrl: blog?.imageUrl,
    date:
      blog?.createdAt &&
      format(blog.createdAt, "dd MMMM yyy", { locale: indonesia }),
  };

  const randomBlog = await db.post.findMany({
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

  const sugestedPost = await db.post.findMany({
    where: {
      id: {
        in: selectedIds,
      },
    },
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

  const formatedSugested = sugestedPost.map((item) => ({
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

  return NextResponse.json(
    {
      message: "Data matches",
      data: formatedBlog,
      sugested_blog: formatedSugested,
    },
    {
      status: 200,
    }
  );
}
