import { auth } from "@/hooks/use-auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { deleteFile } from "@/lib/delete-file";
import { createFile } from "@/lib/create-file";

export async function PATCH(
  req: Request,
  { params }: { params: { posterId: string } }
) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const data = await req.formData();
    const file: File | null = data.get("posterUrl") as unknown as File;
    const title: string = data.get("title") as unknown as string;
    const category: string = data.get("category") as unknown as string;
    const isPublish: string = data.get("isPublish") as unknown as string;

    if (file) {
      const existingFile = await db.poster.findFirst({
        where: {
          id: params.posterId,
        },
      });

      if (!existingFile) {
        return new NextResponse("Poster id is require", { status: 400 });
      }

      if (existingFile.posterUrl) {
        await deleteFile(existingFile.posterUrl);
      }

      const pathname = await createFile(file, title, "blogs", false);

      await db.poster.update({
        where: {
          id: params.posterId,
        },
        data: {
          title: title,
          posterUrl: pathname,
          categoryId: category,
          isPublish: isPublish === "true",
        },
      });
    } else {
      await db.poster.update({
        where: {
          id: params.posterId,
        },
        data: {
          title: title,
          categoryId: category,
          isPublish: isPublish === "true",
        },
      });
    }

    return NextResponse.json("Poster updated success", {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
