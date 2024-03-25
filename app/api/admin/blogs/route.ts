import { auth } from "@/hooks/use-auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { mkdir, readdir, writeFile } from "fs/promises";
import path from "path";

export async function POST(req: Request) {
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

    if (!file) {
      return NextResponse.json({ success: false });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

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

    await db.post.create({
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

    return NextResponse.json("Post added success", {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
