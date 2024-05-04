"use server";

import { db } from "@/lib/db";

export const getPosters = async () => {
  const videos = await db.poster.findMany({
    orderBy: {
      createdAt: "desc",
    },
    select: {
      id: true,
      title: true,
      posterUrl: true,
      description: true,
      createdAt: true,
      isPublish: true,
      profile: {
        select: {
          id: true,
          username: true,
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

  return videos;
};
