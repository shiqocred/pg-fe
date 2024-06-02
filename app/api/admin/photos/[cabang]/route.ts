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
      const photos = await db.photo.findMany({
        where: {
          profile: {
            cabang: params.cabang,
          },
        },
        select: {
          id: true,
          imageUrl: true,
        },
      });

      return NextResponse.json(
        { message: "Photos url is match", isAdmin: true, photos: photos },
        {
          status: 200,
        }
      );
    }
    const photos = await db.photo.findMany({
      where: {
        profileId: userId,
      },
      select: {
        id: true,
        imageUrl: true,
      },
    });

    return NextResponse.json(
      { message: "Photos url is match", isAdmin: false, photos: photos },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.log(error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
