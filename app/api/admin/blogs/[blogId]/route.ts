import { auth } from "@/hooks/use-auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { mkdir, readdir, writeFile, unlink } from "fs/promises";
import path from "path";
import { deleteFile } from "@/lib/delete-file";
import { createFile } from "@/lib/create-file";
import { getIsAdmin } from "@/actions/get-is-admin";

export async function DELETE(
  req: Request,
  { params }: { params: { blogId: string } }
) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const existingFile = await db.post.findFirst({
      where: {
        id: params.blogId,
      },
      select: {
        imageUrl: true,
      },
    });

    if (!existingFile) {
      return new NextResponse("Blog Id is require", { status: 400 });
    }

    if (existingFile.imageUrl) {
      await deleteFile(existingFile.imageUrl);
    }

    await db.post.delete({
      where: {
        id: params.blogId,
      },
    });
    return NextResponse.json("Post deleted success", {
      status: 200,
    });
  } catch (error) {
    console.log("[ERROR_DELETE_BLOG]", error);
    return NextResponse.json("Internal Error", {
      status: 500,
    });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { blogId: string } }
) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const data = await req.formData();
    const file: File | null = data.get("imageUrl") as unknown as File;
    const title: string = data.get("title") as unknown as string;
    const author: string = data.get("author") as unknown as string;
    const highlight: string = data.get("highlight") as unknown as string;
    const article: string = data.get("article") as unknown as string;
    const category: string = data.get("category") as unknown as string;
    const isPublish: string = data.get("isPublish") as unknown as string;

    if (file) {
      const existingFile = await db.post.findFirst({
        where: {
          id: params.blogId,
        },
      });

      if (!existingFile) {
        return new NextResponse("Blog id is require", { status: 400 });
      }

      if (existingFile.imageUrl) {
        await deleteFile(existingFile.imageUrl);
      }

      const pathname = await createFile(file, title, "blogs", false);

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
          isPublish: isPublish === "true" ? true : false,
        },
      });
      return NextResponse.json("Post updated success", {
        status: 200,
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
          isPublish: isPublish === "true" ? true : false,
        },
      });
      return NextResponse.json("Post updated success", {
        status: 200,
      });
    }
  } catch (error) {
    console.log(error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
