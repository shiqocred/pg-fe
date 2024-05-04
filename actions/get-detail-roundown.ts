"use server";

import { db } from "@/lib/db";

export const getDetailRoundown = async (authId: string, acaraId: string) => {
  const roundown = await db.roundown.findFirst({
    where: {
      id: acaraId,
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
