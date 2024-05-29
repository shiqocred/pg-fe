import { getIsAdmin } from "@/actions/get-is-admin";
import { auth } from "@/hooks/use-auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function PATCH(req: Request) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const isAdmin = await getIsAdmin(userId);

    const data = await req.json();

    if (isAdmin) {
      await db.profile.update({
        where: {
          id: data.profileId,
        },
        data: {
          tanggal: data.tanggal,
          waktu: data.waktu,
          tempat: data.tempat,
        },
      });
    } else {
      await db.profile.update({
        where: {
          id: userId,
        },
        data: {
          tanggal: data.tanggal,
          waktu: data.waktu,
          tempat: data.tempat,
        },
      });
    }

    return NextResponse.json("Info added success", {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
