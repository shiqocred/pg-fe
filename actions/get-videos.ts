"use server";

import { db } from "@/lib/db";

export const getVideos = async () => {
  const videos = await db.video.findMany({
    orderBy: {
      createdAt: "desc",
    },
    select: {
      id: true,
      title: true,
      videoUrl: true,
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
