import { getIsAdmin } from "@/actions/get-is-admin";
import { auth } from "@/hooks/use-auth";
import { db } from "@/lib/db";
import { $Enums } from "@prisma/client";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const isAdmin = await getIsAdmin(userId);

    if (isAdmin) {
      const videosCount = await db.video.count({
        where: {
          isPublish: true,
        },
      });
      const videos = await db.video.count();
      const blogsCount = await db.post.count({
        where: {
          isPublish: true,
        },
      });
      const blogs = await db.post.count();
      const postersCount = await db.poster.count({
        where: {
          isPublish: true,
        },
      });
      const posters = await db.poster.count();
      const categories = await db.category.count();
      const photos = await db.photo.count();
      const supervisors = await db.supervisor.count();
      const supervisorsChief = await db.supervisor.count({
        where: {
          position: $Enums.PositionSupervisor.CHIEF,
        },
      });
      const supervisorsStaff = await db.supervisor.count({
        where: {
          position: $Enums.PositionSupervisor.STAFF,
        },
      });
      const sponsorships = await db.sponsor.count();
      const sponsorshipsTunggal = await db.sponsor.count({
        where: {
          position: $Enums.SponsorEnum.TUNGGAL,
        },
      });
      const sponsorshipsUtama = await db.sponsor.count({
        where: {
          position: $Enums.SponsorEnum.UTAMA,
        },
      });
      const sponsorshipsPendamping1 = await db.sponsor.count({
        where: {
          position: $Enums.SponsorEnum.PENDAMPING1,
        },
      });
      const sponsorshipsPendamping2 = await db.sponsor.count({
        where: {
          position: $Enums.SponsorEnum.PENDAMPING2,
        },
      });
      const sponsorshipsPendamping3 = await db.sponsor.count({
        where: {
          position: $Enums.SponsorEnum.PENDAMPING3,
        },
      });

      const profile = await db.profile.findMany({
        where: {
          id: {
            not: userId,
          },
        },
        orderBy: {
          cabang: "asc",
        },
        select: {
          cabang: true,
          tempat: true,
          tanggal: true,
          waktu: true,
          heroUrl: true,
        },
      });

      return NextResponse.json(
        {
          message: "Data matches",
          isAdmin: true,
          data: {
            profile,
            videos: {
              total: videos,
              isPublish: videosCount,
            },
            blogs: {
              total: blogs,
              isPublish: blogsCount,
            },
            posters: {
              total: posters,
              isPublish: postersCount,
            },
            category: {
              total: categories,
            },
            photos: {
              total: photos,
            },
            supervisors: {
              total: supervisors,
              chiefs: supervisorsChief,
              staff: supervisorsStaff,
            },
            sponsorships: {
              total: sponsorships,
              tunggal: sponsorshipsTunggal,
              utama: sponsorshipsUtama,
              pendamping_1: sponsorshipsPendamping1,
              pendamping_2: sponsorshipsPendamping2,
              pendamping_3: sponsorshipsPendamping3,
            },
          },
        },
        {
          status: 200,
        }
      );
    } else {
      const videosCount = await db.video.count({
        where: {
          profileId: userId,
          isPublish: true,
        },
      });
      const videos = await db.video.count({
        where: {
          profileId: userId,
        },
      });
      const blogsCount = await db.post.count({
        where: {
          profileId: userId,
          isPublish: true,
        },
      });
      const blogs = await db.post.count({
        where: {
          profileId: userId,
        },
      });
      const postersCount = await db.poster.count({
        where: {
          profileId: userId,
          isPublish: true,
        },
      });
      const posters = await db.poster.count({
        where: {
          profileId: userId,
        },
      });
      const categories = await db.category.count({
        where: {
          profileId: userId,
        },
      });
      const photos = await db.photo.count({
        where: {
          profileId: userId,
        },
      });
      const supervisors = await db.supervisor.count({
        where: {
          profileId: userId,
        },
      });
      const supervisorsChief = await db.supervisor.count({
        where: {
          profileId: userId,
          position: $Enums.PositionSupervisor.CHIEF,
        },
      });
      const supervisorsStaff = await db.supervisor.count({
        where: {
          profileId: userId,
          position: $Enums.PositionSupervisor.STAFF,
        },
      });
      const sponsorships = await db.sponsor.count({
        where: {
          profileId: userId,
        },
      });
      const sponsorshipsTunggal = await db.sponsor.count({
        where: {
          profileId: userId,
          position: $Enums.SponsorEnum.TUNGGAL,
        },
      });
      const sponsorshipsUtama = await db.sponsor.count({
        where: {
          profileId: userId,
          position: $Enums.SponsorEnum.UTAMA,
        },
      });
      const sponsorshipsPendamping1 = await db.sponsor.count({
        where: {
          profileId: userId,
          position: $Enums.SponsorEnum.PENDAMPING1,
        },
      });
      const sponsorshipsPendamping2 = await db.sponsor.count({
        where: {
          profileId: userId,
          position: $Enums.SponsorEnum.PENDAMPING2,
        },
      });
      const sponsorshipsPendamping3 = await db.sponsor.count({
        where: {
          profileId: userId,
          position: $Enums.SponsorEnum.PENDAMPING3,
        },
      });
      const profile = await db.profile.findMany({
        where: {
          id: userId,
        },
        orderBy: {
          cabang: "asc",
        },
        select: {
          cabang: true,
          tempat: true,
          tanggal: true,
          waktu: true,
          heroUrl: true,
        },
      });

      return NextResponse.json(
        {
          message: "Data matches",
          isAdmin: false,
          data: {
            profile,
            videos: {
              total: videos,
              isPublish: videosCount,
            },
            blogs: {
              total: blogs,
              isPublish: blogsCount,
            },
            posters: {
              total: posters,
              isPublish: postersCount,
            },
            category: {
              total: categories,
            },
            photos: {
              total: photos,
            },
            supervisors: {
              total: supervisors,
              chiefs: supervisorsChief,
              staff: supervisorsStaff,
            },
            sponsorships: {
              total: sponsorships,
              tunggal: sponsorshipsTunggal,
              utama: sponsorshipsUtama,
              pendamping_1: sponsorshipsPendamping1,
              pendamping_2: sponsorshipsPendamping2,
              pendamping_3: sponsorshipsPendamping3,
            },
          },
        },
        {
          status: 200,
        }
      );
    }
  } catch (error) {
    console.log("[ERROR_GET_DASHBOARD]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
