import { auth } from "@/hooks/use-auth";
import { db } from "@/lib/db";
import { $Enums } from "@prisma/client";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { profileId: string } }
) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!params.profileId) {
      return new NextResponse("Profile id is required", { status: 400 });
    }

    const roundowns = await db.roundown.findMany({
      where: {
        profileId: params.profileId,
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
      { message: "roundowns is match", roundowns: roundowns },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.log(error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
