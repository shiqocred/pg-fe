"use server";

import { db } from "@/lib/db";

export const getBlogs = async () => {
  const blogs = await db.post.findMany({
    orderBy: {
      createdAt: "desc",
    },
    select: {
      id: true,
      title: true,
      author: true,
      highlight: true,
      createdAt: true,
      profile: {
        select: {
          id: true,
          username: true,
        },
      },
      branch: {
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

  return blogs;
};