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

    const heroUrl = await db.profile.findFirst({
      where: {
        id: params.profileId,
      },
      select: {
        id: true,
        heroUrl: true,
      },
    });

    return NextResponse.json(
      { message: "Hero url is match", heroUrl: heroUrl },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.log(error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
