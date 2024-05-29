"use server";

import { db } from "@/lib/db";

export const getFaqs = async (id: string) => {
  const faqs = await db.faq.findMany({
    where: {
      profileId: id,
    },
    orderBy: {
      position: "asc",
    },
    select: {
      id: true,
      question: true,
      answer: true,
      position: true,
    },
  });

  return faqs;
};
