import { auth } from "@/hooks/use-auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { mkdir, readdir, writeFile, unlink } from "fs/promises";
import path from "path";
import { getIsAdmin } from "@/actions/get-is-admin";

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
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const existingFile = await db.poster.findFirst({
        where: {
          id: params.posterId,
        },
      });

      if (!existingFile) {
        return new NextResponse("Poster id is require", { status: 400 });
      }

      const currentPath = path.join(
        process.cwd() + "/public" + existingFile.posterUrl
      );

      await unlink(currentPath);

      const pathen = path.join(process.cwd() + "/public/images/poster");

      const nameFile = `${
        Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000
      }-${title.toLocaleLowerCase().split(" ").join("_")}.${
        file.type.split("/")[1]
      }`;

      const pathname = `/images/poster/${nameFile}`;

      try {
        await readdir(pathen);
      } catch (error) {
        await mkdir(pathen);
      }

      await writeFile(`${pathen}/${nameFile}`, buffer);

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
