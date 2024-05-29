"use server";

import { db } from "@/lib/db";

export const destroyCategory = async (id: string) => {
  await db.category.delete({
    where: {
      id: id,
    },
  });

  return "Category deleted";
};
