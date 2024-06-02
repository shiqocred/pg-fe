import { getIsAdmin } from "@/actions/get-is-admin";
import { auth } from "@/hooks/use-auth";
import { db } from "@/lib/db";
import { $Enums } from "@prisma/client";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const isAdmin = await getIsAdmin(userId);

    const data = await req.json();
    const cabang: $Enums.CabangRole = data.cabang;

    if (isAdmin) {
      const profileId = await db.profile.findFirst({
        where: {
          cabang: cabang,
        },
        select: {
          id: true,
        },
      });

      if (!profileId?.id) {
        return new NextResponse("Cabang invalid", { status: 400 });
      }
      const lastFaq = await db.faq.findFirst({
        where: {
          profileId: profileId.id,
        },
        orderBy: {
          position: "desc",
        },
      });

      const newPosition = lastFaq ? lastFaq.position + 1 : 1;

      await db.faq.create({
        data: {
          question: data.question,
          answer: data.answer,
          position: newPosition,
          profileId: profileId.id,
        },
      });

      return NextResponse.json(
        { message: "Faq added success", isAdmin: true },
        {
          status: 200,
        }
      );
    }
    const lastFaq = await db.faq.findFirst({
      where: {
        profile: {
          cabang,
        },
      },
      orderBy: {
        position: "desc",
      },
    });

    const newPosition = lastFaq ? lastFaq.position + 1 : 1;

    await db.faq.create({
      data: {
        question: data.question,
        answer: data.answer,
        position: newPosition,
        profileId: userId,
      },
    });

    return NextResponse.json(
      { message: "Faq added success", isAdmin: false },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.log(error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
