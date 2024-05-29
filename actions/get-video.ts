"use server";

import { db } from "@/lib/db";
import { getCategories } from "./get-categories";

export const getVideo = async (id: string) => {
  const videos = await db.video.findFirst({
    where: {
      id: id,
    },
    select: {
      id: true,
      title: true,
      videoUrl: true,
      createdAt: true,
      isPublish: true,
      thumbnailUrl: true,
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

  const formatedVideo = {
    ...videos,
    categories,
    cabang,
  };

  return formatedVideo;
};
