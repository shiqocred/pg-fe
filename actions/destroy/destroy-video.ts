"use server";

import { db } from "@/lib/db";
import { unlink } from "fs/promises";
import path from "path";

export const destroyVideo = async (id: string) => {
  const video = await db.video.findFirst({
    where: { id },
    select: { thumbnailUrl: true },
  });

  if (video?.thumbnailUrl) {
    const currentPath = path.join(
      process.cwd() + "/public" + video.thumbnailUrl
    );

    await unlink(currentPath);
  }

  await db.video.delete({
    where: {
      id: id,
    },
  });

  return "Video deleted";
};
