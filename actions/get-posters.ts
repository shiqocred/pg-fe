"use server";

import { db } from "@/lib/db";
import { getIsAdmin } from "./get-is-admin";

export const getPosters = async (userId: string) => {
  const isAdmin = await getIsAdmin(userId);

  if (isAdmin) {
    const posters = await db.poster.findMany({
      orderBy: {
        createdAt: "desc",
      },
      select: {
        id: true,
        title: true,
        posterUrl: true,
        createdAt: true,
        isPublish: true,
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

    const formatedPosters = posters.map((item) => ({
      ...item,
      admin: true,
    }));

    return formatedPosters;
  }
  const posters = await db.poster.findMany({
    where: {
      profileId: userId,
    },
    orderBy: {
      createdAt: "desc",
    },
    select: {
      id: true,
      title: true,
      posterUrl: true,
      createdAt: true,
      isPublish: true,
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

  const formatedPosters = posters.map((item) => ({
    ...item,
    admin: false,
  }));

  return formatedPosters;
};
