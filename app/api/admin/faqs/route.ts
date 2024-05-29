import { getIsAdmin } from "@/actions/get-is-admin";
import { auth } from "@/hooks/use-auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const isAdmin = await getIsAdmin(userId);

    const data = await req.json();

    const lastFaq = await db.faq.findFirst({
      where: {
        profileId: userId,
      },
      orderBy: {
        position: "desc",
      },
    });

    const newPosition = lastFaq ? lastFaq.position + 1 : 1;

    if (isAdmin) {
      await db.faq.create({
        data: {
          question: data.question,
          answer: data.answer,
          position: newPosition,
          profileId: data.profileId,
        },
      });
    } else {
      await db.faq.create({
        data: {
          question: data.question,
          answer: data.answer,
          position: newPosition,
          profileId: userId,
        },
      });
    }

    return NextResponse.json("Faq added success", {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
