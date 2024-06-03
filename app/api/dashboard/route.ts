import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const videos = await db.video.findMany({
      where: {
        isPublish: true,
      },
      orderBy: { createdAt: "desc" },
      take: 5,
      select: {
        id: true,
        title: true,
        videoUrl: true,
        createdAt: true,
        isPublish: true,
        thumbnailUrl: true,
        profile: {
          select: {
            id: true,
            cabang: true,
          },
        },
        category: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    const photos = await db.photo.findMany({
      orderBy: { createdAt: "desc" },
      take: 6,
      select: {
        id: true,
        imageUrl: true,
        profile: {
          select: {
            id: true,
            cabang: true,
          },
        },
      },
    });

    const posts = await db.post.findMany({
      where: {
        isPublish: true,
      },
      orderBy: { createdAt: "desc" },
      take: 5,
      select: {
        id: true,
        title: true,
        author: true,
        highlight: true,
        createdAt: true,
        isPublish: true,
        imageUrl: true,
        profile: {
          select: {
            id: true,
            cabang: true,
          },
        },
        category: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
    const posters = await db.poster.findMany({
      where: {
        isPublish: true,
      },
      orderBy: { createdAt: "desc" },
      take: 5,
      select: {
        id: true,
        title: true,
        posterUrl: true,
        createdAt: true,
        isPublish: true,
        profile: {
          select: {
            id: true,
            cabang: true,
          },
        },
        category: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    return NextResponse.json(
      {
        message: "Data matches",
        data: {
          videos,
          photos,
          posts,
          posters,
        },
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.log("[ERROR_GET_DASHBOARD]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
