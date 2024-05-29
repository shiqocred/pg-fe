"use server";

import { db } from "@/lib/db";

export const getDetailFaqs = async (id: string) => {
  const faq = await db.faq.findFirst({
    where: {
      id: id,
    },
    select: {
      id: true,
      question: true,
      answer: true,
    },
  });

  return faq;
};
