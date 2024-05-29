"use server";

import { db } from "@/lib/db";
import { getIsAdmin } from "./get-is-admin";

export const getHero = async (id: string) => {
  const profile = await db.profile.findFirst({
    where: {
      id: id,
    },
    select: {
      id: true,
      cabang: true,
      heroUrl: true,
    },
  });

  return profile;
};
