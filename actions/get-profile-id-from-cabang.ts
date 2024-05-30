"use server";

import { db } from "@/lib/db";
import { $Enums } from "@prisma/client";

export const getProfileIdFromCabang = async (cabang: $Enums.CabangRole) => {
  const id = await db.profile.findFirst({
    where: {
      cabang,
    },
    select: {
      id: true,
    },
  });

  return id;
};
