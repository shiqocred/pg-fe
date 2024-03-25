"use server";

import { db } from "@/lib/db";

export const getCategories = async () => {
  const categories = await db.category.findMany({
    orderBy: {
      name: "asc",
    },
    select: {
      id: true,
      name: true,
      profileId: true,
      profile: {
        select: {
          branches: {
            select: {
              cabang: true,
              id: true,
            },
          },
        },
      },
    },
  });

  return categories;
};
