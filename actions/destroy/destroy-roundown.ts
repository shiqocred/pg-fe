"use server";

import { db } from "@/lib/db";
import { unlink } from "fs/promises";
import path from "path";

export const destroyRoundown = async (id: string) => {
  const acara = await db.roundown.findFirst({
    where: { id },
    select: { imageUrl: true },
  });

  if (acara?.imageUrl) {
    const currentPath = path.join(process.cwd() + "/public" + acara.imageUrl);

    await unlink(currentPath);
  }
  await db.roundown.delete({
    where: {
      id: id,
    },
  });

  return "Roundown deleted";
};
