"use server";

import { db } from "@/lib/db";

export const getPhotos = async (userId: string) => {
  const photos = await db.photo.findMany({
    where: {
      profileId: userId,
    },
    orderBy: {
      createdAt: "desc",
    },
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

  return photos;
};
