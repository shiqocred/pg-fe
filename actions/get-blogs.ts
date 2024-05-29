"use server";

import { db } from "@/lib/db";
import { getIsAdmin } from "./get-is-admin";

export const getBlogs = async (userId: string) => {
  const isAdmin = await getIsAdmin(userId);

  if (isAdmin) {
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
        isPublish: true,
        imageUrl: true,
        profile: {
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

    const formatedBlogs = blogs.map((item) => ({
      ...item,
      admin: true,
    }));
    return formatedBlogs;
  }
  const blogs = await db.post.findMany({
    where: {
      profileId: userId,
    },
    orderBy: {
      createdAt: "desc",
    },
    select: {
      id: true,
      title: true,
      author: true,
      highlight: true,
      createdAt: true,
      isPublish: true,
      imageUrl: true,
      profile: {
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

  const formatedBlogs = blogs.map((item) => ({
    ...item,
    admin: false,
  }));

  return formatedBlogs;
};
