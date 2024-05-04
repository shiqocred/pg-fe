"use server";

import { db } from "@/lib/db";

export const getRoundowns = async (authId: string) => {
  const roundown = await db.roundown.findMany({
    where: {
      profileId: authId,
    },
    orderBy: {
      position: "asc",
    },
    select: {
      id: true,
      title: true,
      imageUrl: true,
      position: true,
      profile: {
        select: {
          cabang: true,
        },
      },
    },
  });

  return roundown;
};
