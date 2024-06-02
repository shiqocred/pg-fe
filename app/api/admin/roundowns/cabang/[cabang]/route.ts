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
      const roundowns = await db.roundown.findMany({
        where: {
          profile: { cabang: params.cabang },
        },
        orderBy: {
          position: "asc",
        },
        select: {
          id: true,
          title: true,
          imageUrl: true,
          position: true,
          profile: {
            select: {
              id: true,
              cabang: true,
            },
          },
        },
      });

      return NextResponse.json(
        { message: "roundowns is match", isAdmin: true, roundowns: roundowns },
        {
          status: 200,
        }
      );
    }
    const roundowns = await db.roundown.findMany({
      where: {
        profileId: userId,
      },
      orderBy: {
        position: "asc",
      },
      select: {
        id: true,
        title: true,
        imageUrl: true,
        position: true,
        profile: {
          select: {
            id: true,
            cabang: true,
          },
        },
      },
    });

    return NextResponse.json(
      { message: "roundowns is match", isAdmin: false, roundowns: roundowns },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.log(error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
