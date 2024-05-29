"use server";

import { db } from "@/lib/db";
import { unlink } from "fs/promises";
import path from "path";

export const destroySponsorship = async (id: string) => {
  const sponsorship = await db.sponsor.findFirst({
    where: { id },
    select: { imageUrl: true },
  });

  if (sponsorship?.imageUrl) {
    const currentPath = path.join(
      process.cwd() + "/public" + sponsorship.imageUrl
    );

    await unlink(currentPath);
  }

  await db.sponsor.delete({
    where: {
      id: id,
    },
  });

  return "Sponsorship deleted";
};
