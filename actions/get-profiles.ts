"use server";

import { db } from "@/lib/db";

export const getProfiles = async () => {
  const profile = await db.profile.findMany({
    select: {
      id: true,
      cabang: true,
    },
  });

  return profile;
};
