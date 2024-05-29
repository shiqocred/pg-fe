"use server";

import { db } from "@/lib/db";
import { getIsAdmin } from "./get-is-admin";

export const getSupervisors = async (authId: string) => {
  const isAdmin = await getIsAdmin(authId);

  if (isAdmin) {
    const supervisors = await db.supervisor.findMany({
      select: {
        id: true,
        name: true,
        imageUrl: true,
        position: true,
        createdAt: true,
        profile: {
          select: {
            id: true,
            cabang: true,
          },
        },
      },
    });

    const formatedSupervisors = supervisors.map((item) => ({
      ...item,
      admin: true,
    }));

    return formatedSupervisors;
  }
  const supervisors = await db.supervisor.findMany({
    where: {
      profileId: authId,
    },
    select: {
      id: true,
      name: true,
      imageUrl: true,
      position: true,
      createdAt: true,
      profile: {
        select: {
          id: true,
          cabang: true,
        },
      },
    },
  });

  const formatedSupervisors = supervisors.map((item) => ({
    ...item,
    admin: false,
  }));

  return formatedSupervisors;
};
