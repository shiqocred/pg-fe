import { auth } from "@/hooks/use-auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { mkdir, readdir, writeFile } from "fs/promises";
import path from "path";
import { getIsAdmin } from "@/actions/get-is-admin";
import { $Enums } from "@prisma/client";
import { createFile } from "@/lib/create-file";

export async function POST(req: Request) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const isAdmin = await getIsAdmin(userId);

    const data = await req.formData();
    const files: File[] | null = data.getAll("imageUrl") as unknown as File[];
    const cabang: $Enums.CabangRole = data.get("cabang") as $Enums.CabangRole;

    if (!files) {
      return new NextResponse("No Images", { status: 500 });
    }

    const dataMap = files.map(async (file) => {
      const pathname = await createFile(file, "", "photos", true);

      if (isAdmin) {
        const profileId = await db.profile.findFirst({
          where: {
            cabang: cabang,
          },
          select: {
            id: true,
          },
        });
        const dataStore = {
          imageUrl: pathname,
          profileId: profileId?.id ?? "",
        };
        return dataStore;
      } else {
        const dataStore = {
          imageUrl: pathname,
          profileId: userId,
        };
        return dataStore;
      }
    });

    await db.photo.createMany({
      data: await Promise.all(dataMap),
    });

    return NextResponse.json("Post added success", {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
