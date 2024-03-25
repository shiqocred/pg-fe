import { auth } from "@/hooks/use-auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { mkdir, readdir, writeFile, unlink } from "fs/promises";
import path from "path";

export async function PATCH(
  req: Request,
  { params }: { params: { blogId: string } }
) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const existingBranch = await db.branch.findUnique({
      where: {
        profileId: userId,
      },
      select: {
        id: true,
        cabang: true,
      },
    });

    if (!existingBranch) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const data = await req.formData();
    const file: File | null = data.get("imageUrl") as unknown as File;
    const title: string = data.get("title") as unknown as string;
    const author: string = data.get("author") as unknown as string;
    const highlight: string = data.get("highlight") as unknown as string;
    const article: string = data.get("article") as unknown as string;
    const category: string = data.get("category") as unknown as string;

    if (file) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const existingFile = await db.post.findFirst({
        where: {
          id: params.blogId,
        },
      });

      if (!existingFile) {
        return new NextResponse("Blog id is require", { status: 400 });
      }

      const currentPath = path.join(
        process.cwd() + "/public" + existingFile.imageUrl
      );

      await unlink(currentPath);

      const pathen = path.join(process.cwd() + "/public/images/");

      const nameFile = `${
        Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000
      }-${file.name}`;

      const pathname = `/images/${nameFile}`;

      try {
        await readdir(pathen);
      } catch (error) {
        await mkdir(pathen);
      }

      await writeFile(`${pathen}/${nameFile}`, buffer);

      await db.post.update({
        where: {
          id: params.blogId,
        },
        data: {
          title: title,
          author: author,
          highlight: highlight,
          imageUrl: pathname,
          article: article,
          categoryId: category,
          profileId: userId,
          branchId: existingBranch.id,
        },
      });
    } else {
      await db.post.update({
        where: {
          id: params.blogId,
        },
        data: {
          title: title,
          author: author,
          highlight: highlight,
          article: article,
          categoryId: category,
          profileId: userId,
          branchId: existingBranch.id,
        },
      });
    }

    return NextResponse.json("Post updated success", {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}