import { db } from "@/lib/db";
import { $Enums } from "@prisma/client";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { gontorId: $Enums.CabangRole } }
) {
  try {
    const videos = await db.video.findMany({
      where: {
        profile: {
          cabang: params.gontorId,
        },
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
      where: {
        profile: {
          cabang: params.gontorId,
        },
      },
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
        profile: {
          cabang: params.gontorId,
        },
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
        profile: {
          cabang: params.gontorId,
        },
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
    const profile = await db.profile.findFirst({
      where: {
        cabang: params.gontorId,
      },
      select: {
        id: true,
        heroUrl: true,
        tanggal: true,
        waktu: true,
        tempat: true,
      },
    });
    const roundowns = await db.roundown.findMany({
      where: {
        profile: {
          cabang: params.gontorId,
        },
      },
      orderBy: {
        position: "asc",
      },
      select: {
        id: true,
        title: true,
        imageUrl: true,
        position: true,
        profile: {
          select: {
            id: true,
            cabang: true,
          },
        },
      },
    });
    const faqs = await db.faq.findMany({
      where: {
        profile: {
          cabang: params.gontorId,
        },
      },
      orderBy: {
        position: "asc",
      },
      select: {
        id: true,
        question: true,
        answer: true,
        position: true,
      },
    });
    const supervisorsChiefs = await db.supervisor.findMany({
      where: {
        profile: {
          cabang: params.gontorId,
        },
        position: "CHIEF",
      },
      select: {
        id: true,
        name: true,
        imageUrl: true,
        position: true,
        createdAt: true,
        profile: {
          select: {
            id: true,
            cabang: true,
          },
        },
      },
    });
    const supervisorsStaff = await db.supervisor.findMany({
      where: {
        profile: {
          cabang: params.gontorId,
        },
        position: "STAFF",
      },
      select: {
        id: true,
        name: true,
        imageUrl: true,
        position: true,
        createdAt: true,
        profile: {
          select: {
            id: true,
            cabang: true,
          },
        },
      },
    });
    const sponsorshipsUtama = await db.sponsor.findMany({
      where: {
        profile: {
          cabang: params.gontorId,
        },
        position: "UTAMA",
      },
      select: {
        id: true,
        name: true,
        imageUrl: true,
        position: true,
        createdAt: true,
        href: true,
        profile: {
          select: {
            id: true,
            cabang: true,
          },
        },
      },
    });
    const sponsorshipsTunggal = await db.sponsor.findMany({
      where: {
        profile: {
          cabang: params.gontorId,
        },
        position: "TUNGGAL",
      },
      select: {
        id: true,
        name: true,
        imageUrl: true,
        position: true,
        createdAt: true,
        href: true,
        profile: {
          select: {
            id: true,
            cabang: true,
          },
        },
      },
    });
    const sponsorshipsPendamping1 = await db.sponsor.findMany({
      where: {
        profile: {
          cabang: params.gontorId,
        },
        position: "PENDAMPING1",
      },
      select: {
        id: true,
        name: true,
        imageUrl: true,
        position: true,
        createdAt: true,
        href: true,
        profile: {
          select: {
            id: true,
            cabang: true,
          },
        },
      },
    });
    const sponsorshipsPendamping2 = await db.sponsor.findMany({
      where: {
        profile: {
          cabang: params.gontorId,
        },
        position: "PENDAMPING2",
      },
      select: {
        id: true,
        name: true,
        imageUrl: true,
        position: true,
        createdAt: true,
        href: true,
        profile: {
          select: {
            id: true,
            cabang: true,
          },
        },
      },
    });
    const sponsorshipsPendamping3 = await db.sponsor.findMany({
      where: {
        profile: {
          cabang: params.gontorId,
        },
        position: "PENDAMPING3",
      },
      select: {
        id: true,
        name: true,
        imageUrl: true,
        position: true,
        createdAt: true,
        href: true,
        profile: {
          select: {
            id: true,
            cabang: true,
          },
        },
      },
    });

    return NextResponse.json(
      {
        message: "Data matches",
        data: {
          supervisors: {
            chiefs: supervisorsChiefs,
            staff: supervisorsStaff,
          },
          sponsorships: {
            utama: sponsorshipsUtama,
            tunggal: sponsorshipsTunggal,
            pendamping_1: sponsorshipsPendamping1,
            pendamping_2: sponsorshipsPendamping2,
            pendamping_3: sponsorshipsPendamping3,
          },
          faqs,
          roundowns,
          profile,
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
