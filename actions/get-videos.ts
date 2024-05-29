"use server";

import { db } from "@/lib/db";
import { getIsAdmin } from "./get-is-admin";

export const getVideos = async (userId: string) => {
  const isAdmin = await getIsAdmin(userId);

  if (isAdmin) {
    const videos = await db.video.findMany({
      orderBy: {
        createdAt: "desc",
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

    const formatedVideos = videos.map((item) => ({
      ...item,
      admin: true,
    }));

    return formatedVideos;
  }
  const videos = await db.video.findMany({
    where: {
      profileId: userId,
    },
    orderBy: {
      createdAt: "desc",
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

  const formatedVideos = videos.map((item) => ({
    ...item,
    admin: false,
  }));

  return formatedVideos;
};
