"use server";

import { db } from "@/lib/db";

export const getProfile = async (id: string) => {
  const profile = await db.profile.findFirst({
    where: {
      id: id,
    },
    select: {
      id: true,
      cabang: true,
      waktu: true,
      tanggal: true,
      tempat: true,
    },
  });

  return profile;
};
