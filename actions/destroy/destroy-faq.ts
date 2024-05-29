"use server";

import { db } from "@/lib/db";

export const destroyFaq = async (id: string) => {
  await db.faq.delete({
    where: {
      id: id,
    },
  });

  return "FAQ deleted";
};
