"use server";

import { db } from "@/lib/db";
import { unlink } from "fs/promises";
import path from "path";

export const destroyPhotos = async (photoId: string[]) => {
  const photos = await db.photo.findMany({
    where: {
      id: {
        in: photoId,
      },
    },
    select: { imageUrl: true },
  });

  photos.map(async (item) => {
    if (item.imageUrl) {
      const currentPath = path.join(process.cwd() + "/public" + item.imageUrl);

      await unlink(currentPath);
    }
  });

  await db.photo.deleteMany({
    where: {
      id: {
        in: photoId,
      },
    },
  });

  return "Photos deleted";
};
