import { auth } from "@/hooks/use-auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { mkdir, readdir, unlink, writeFile } from "fs/promises";
import path from "path";
import { createFile } from "@/lib/create-file";
import { deleteFile } from "@/lib/delete-file";

export async function PATCH(
  req: Request,
  { params }: { params: { roundownId: string } }
) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const data = await req.formData();
    const file: File | null = data.get("imageUrl") as unknown as File;
    const title: string = data.get("title") as unknown as string;

    if (file) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const existingFile = await db.roundown.findFirst({
        where: {
          id: params.roundownId,
        },
      });

      if (!existingFile) {
        return new NextResponse("Roundown id is require", { status: 400 });
      }

      if (existingFile.imageUrl) {
        await deleteFile(existingFile.imageUrl);
      }

      const pathname = await createFile(file, title, "roundowns", false);

      await db.roundown.update({
        where: {
          id: params.roundownId,
        },
        data: {
          title: title,
          imageUrl: pathname,
        },
      });
    } else {
      await db.roundown.update({
        where: {
          id: params.roundownId,
        },
        data: {
          title: title,
        },
      });
    }

    return NextResponse.json("Roundown added success", {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
