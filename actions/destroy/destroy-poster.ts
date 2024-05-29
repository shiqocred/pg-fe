"use server";

import { db } from "@/lib/db";
import { unlink } from "fs/promises";
import path from "path";

export const destroyPoster = async (id: string) => {
  const poster = await db.poster.findFirst({
    where: { id },
    select: { posterUrl: true },
  });

  if (poster?.posterUrl) {
    const currentPath = path.join(process.cwd() + "/public" + poster.posterUrl);

    await unlink(currentPath);
  }

  await db.poster.delete({
    where: {
      id: id,
    },
  });

  return "Poster deleted";
};
