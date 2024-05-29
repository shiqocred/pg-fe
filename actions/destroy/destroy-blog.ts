"use server";

import { db } from "@/lib/db";
import { unlink } from "fs/promises";
import path from "path";

export const destroyBlog = async (id: string) => {
  const blog = await db.post.findFirst({
    where: { id },
    select: { imageUrl: true },
  });

  if (blog?.imageUrl) {
    const currentPath = path.join(process.cwd() + "/public" + blog.imageUrl);

    await unlink(currentPath);
  }

  await db.post.delete({
    where: {
      id: id,
    },
  });

  return "Blog deleted";
};
