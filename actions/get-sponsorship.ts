"use server";

import { db } from "@/lib/db";
import { getCategories } from "./get-categories";

export const getSponsorship = async (authId: string) => {
  const sponsorship = await db.sponsor.findFirst({
    where: {
      id: authId,
    },
    select: {
      id: true,
      name: true,
      imageUrl: true,
      position: true,
      href: true,
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

  const formatedSponsorship = {
    ...sponsorship,
    categories,
    cabang,
  };

  return formatedSponsorship;
};
