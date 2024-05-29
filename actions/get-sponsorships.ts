"use server";

import { db } from "@/lib/db";
import { getIsAdmin } from "./get-is-admin";

export const getSponsorships = async (authId: string) => {
  const isAdmin = await getIsAdmin(authId);

  if (isAdmin) {
    const sponsorship = await db.sponsor.findMany({
      select: {
        id: true,
        name: true,
        imageUrl: true,
        position: true,
        createdAt: true,
        href: true,
        profile: {
          select: {
            id: true,
            cabang: true,
          },
        },
      },
    });

    const formatedSponsorships = sponsorship.map((item) => ({
      ...item,
      admin: true,
    }));

    return formatedSponsorships;
  }
  const sponsorship = await db.sponsor.findMany({
    where: {
      profileId: authId,
    },
    select: {
      id: true,
      name: true,
      imageUrl: true,
      position: true,
      createdAt: true,
      href: true,
      profile: {
        select: {
          id: true,
          cabang: true,
        },
      },
    },
  });

  const formatedSponsorships = sponsorship.map((item) => ({
    ...item,
    admin: false,
  }));

  return formatedSponsorships;
};
