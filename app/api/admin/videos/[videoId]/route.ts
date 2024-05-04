import { auth } from "@/hooks/use-auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

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

    const values = await req.json();

    if (!values) {
      return new NextResponse("Missing required field", { status: 400 });
    }

    const ownerVideo = await db.profile.findFirst({
      where: {
        id: userId,
        videos: {
          some: {
            id: params.videoId,
          },
        },
      },
    });

    if (!ownerVideo) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    await db.video.update({
      where: {
        id: params.videoId,
        profileId: userId,
      },
      data: {
        title: values.title,
        description: values.description,
        categoryId: values.category,
        videoUrl: values.videoUrl,
        isPublish: values.isPublish,
        profileId: userId,
      },
    });

    return NextResponse.json("Video updated success", { status: 200 });
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}
