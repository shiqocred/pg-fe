import { NextResponse } from "next/server";

import { db } from "@/lib/db";
import { auth } from "@/hooks/use-auth";

export async function PATCH(
  req: Request,
  { params }: { params: { faqId: string } }
) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const body = await req.json();

    await db.faq.update({
      where: {
        id: params.faqId,
      },
      data: {
        question: body.question,
        answer: body.answer,
      },
    });

    return NextResponse.json("Faq updated success", {
      status: 200,
    });
  } catch (error) {
    console.log("[REORDER]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
