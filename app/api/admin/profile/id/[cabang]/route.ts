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

    if (!params.cabang) {
      return new NextResponse("Cabang is required", { status: 400 });
    }

    const id = await db.profile.findFirst({
      where: {
        cabang: params.cabang,
      },
      select: {
        id: true,
      },
    });

    return NextResponse.json(
      { message: "Profile id match", profileId: id },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.log(error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
