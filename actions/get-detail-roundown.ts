"use server";

import { db } from "@/lib/db";

export const getDetailRoundown = async (acaraId: string) => {
  const roundown = await db.roundown.findFirst({
    where: {
      id: acaraId,
    },
    select: {
      id: true,
      title: true,
      imageUrl: true,
    },
  });

  return roundown;
};
