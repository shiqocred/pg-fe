import { auth } from "@/hooks/use-auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { mkdir, readdir, writeFile, unlink } from "fs/promises";
import path from "path";
import { getIsAdmin } from "@/actions/get-is-admin";
import { createFile } from "@/lib/create-file";
import { deleteFile } from "@/lib/delete-file";

export async function PATCH(
  req: Request,
  { params }: { params: { videoId: string } }
) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!params.videoId) {
      return new NextResponse("Category id is required", { status: 400 });
    }

    const data = await req.formData();
    const file: File | null = data.get("thumbnailUrl") as unknown as File;
    const title: string = data.get("title") as unknown as string;
    const videoUrl: string = data.get("videoUrl") as unknown as string;
    const category: string = data.get("category") as unknown as string;
    const isPublish: string = data.get("isPublish") as unknown as string;

    if (file) {
      const existingFile = await db.video.findFirst({
        where: {
          id: params.videoId,
        },
      });

      if (!existingFile) {
        return new NextResponse("Video id is require", { status: 400 });
      }

      if (existingFile.thumbnailUrl) {
        await deleteFile(existingFile.thumbnailUrl);
      }

      const pathname = await createFile(file, title, "videos", false);

      await db.video.update({
        where: {
          id: params.videoId,
        },
        data: {
          title: title,
          thumbnailUrl: pathname,
          categoryId: category,
          videoUrl: videoUrl,
          isPublish: isPublish === "true" ? true : false,
        },
      });
    } else {
      await db.video.update({
        where: {
          id: params.videoId,
        },
        data: {
          title: title,
          categoryId: category,
          videoUrl: videoUrl,
          isPublish: isPublish === "true" ? true : false,
        },
      });
    }

    return NextResponse.json("Video updated success", { status: 200 });
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}
