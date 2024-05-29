"use server";

import { db } from "@/lib/db";
import { unlink } from "fs/promises";
import path from "path";

export const destroySupervisor = async (id: string) => {
  const supervisor = await db.supervisor.findFirst({
    where: { id },
    select: { imageUrl: true },
  });

  if (supervisor?.imageUrl) {
    const currentPath = path.join(
      process.cwd() + "/public" + supervisor.imageUrl
    );

    await unlink(currentPath);
  }

  await db.supervisor.delete({
    where: {
      id: id,
    },
  });

  return "Supervisor deleted";
};
