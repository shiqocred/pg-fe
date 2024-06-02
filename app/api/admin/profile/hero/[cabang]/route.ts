import { getIsAdmin } from "@/actions/get-is-admin";
import { auth } from "@/hooks/use-auth";
import { db } from "@/lib/db";
import { $Enums } from "@prisma/client";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { cabang: $Enums.CabangRole } }
) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const isAdmin = await getIsAdmin(userId);

    if (!params.cabang) {
      return new NextResponse("Profile id is required", { status: 400 });
    }

    if (isAdmin) {
      const heroUrl = await db.profile.findFirst({
        where: {
          cabang: params.cabang,
        },
        select: {
          id: true,
          heroUrl: true,
        },
      });

      return NextResponse.json(
        { message: "Hero url is match", isAdmin: true, heroUrl: heroUrl },
        {
          status: 200,
        }
      );
    }
    const heroUrl = await db.profile.findFirst({
      where: {
        id: userId,
      },
      select: {
        id: true,
        heroUrl: true,
      },
    });

    return NextResponse.json(
      { message: "Hero url is match", isAdmin: false, heroUrl: heroUrl },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.log(error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
