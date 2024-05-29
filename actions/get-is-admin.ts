"use server";

import { db } from "@/lib/db";

export const getIsAdmin = async (userId: string) => {
  const isAuth = await db.profile.findFirst({
    where: {
      id: userId,
    },
    select: { cabang: true },
  });
  const isAdmin = isAuth?.cabang === "ALL";
  return isAdmin;
};
