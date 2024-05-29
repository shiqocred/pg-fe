"use server";

import { db } from "@/lib/db";
import { getCategories } from "./get-categories";

export const getBlog = async (id: string) => {
  const blog = await db.post.findFirst({
    where: {
      id: id,
    },
    select: {
      id: true,
      title: true,
      author: true,
      highlight: true,
      createdAt: true,
      isPublish: true,
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

  const categories = await getCategories();

  const cabang = await db.profile.findMany({
    select: {
      id: true,
      cabang: true,
    },
  });

  const formatedBlog = {
    ...blog,
    categories,
    cabang,
  };

  return formatedBlog;
};
