"use server";

import { db } from "@/lib/db";
import { getCategories } from "./get-categories";

export const getPoster = async (userId: string) => {
  const poster = await db.poster.findFirst({
    where: {
      id: userId,
    },
    orderBy: {
      createdAt: "desc",
    },
    select: {
      id: true,
      title: true,
      posterUrl: true,
      createdAt: true,
      isPublish: true,
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

  const formatedPoster = {
    ...poster,
    categories,
    cabang,
  };

  return formatedPoster;
};
