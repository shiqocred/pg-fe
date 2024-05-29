import { auth } from "@/hooks/use-auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { mkdir, readdir, writeFile, unlink } from "fs/promises";
import path from "path";
import { getIsAdmin } from "@/actions/get-is-admin";

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
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const existingFile = await db.video.findFirst({
        where: {
          id: params.videoId,
        },
      });

      if (!existingFile) {
        return new NextResponse("Video id is require", { status: 400 });
      }

      const currentPath = path.join(
        process.cwd() + "/public" + existingFile.thumbnailUrl
      );

      await unlink(currentPath);

      const pathen = path.join(process.cwd() + "/public/images/videos");

      const nameFile = `${
        Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000
      }-${title.toLocaleLowerCase().split(" ").join("_")}.${
        file.type.split("/")[1]
      }`;

      const pathname = `/images/videos/${nameFile}`;

      try {
        await readdir(pathen);
      } catch (error) {
        await mkdir(pathen);
      }

      await writeFile(`${pathen}/${nameFile}`, buffer);

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
