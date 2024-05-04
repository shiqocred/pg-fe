import { auth } from "@/hooks/use-auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const values = await req.json();

    if (!values) {
      return new NextResponse("Missing required field", { status: 400 });
    }

    await db.video.create({
      data: {
        title: values.title,
        description: values.description,
        categoryId: values.category,
        videoUrl: values.videoUrl,
        isPublish: values.isPublish,
        profileId: userId,
      },
    });

    return NextResponse.json("Video added success", { status: 200 });
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}
