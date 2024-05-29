"use server";

import { db } from "@/lib/db";
import { getCategories } from "./get-categories";

export const getSupervisor = async (authId: string) => {
  const supervisor = await db.supervisor.findFirst({
    where: {
      id: authId,
    },
    select: {
      id: true,
      name: true,
      imageUrl: true,
      position: true,
      profile: {
        select: {
          id: true,
          cabang: true,
        },
      },
    },
  });

  const categories = await getCategories();

  const cabang = await db.profile.findMany({
    select: {
      id: true,
      cabang: true,
    },
  });

  const formatedSupervisor = {
    ...supervisor,
    categories,
    cabang,
  };

  return formatedSupervisor;
};
