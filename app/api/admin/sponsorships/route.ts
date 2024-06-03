import { auth } from "@/hooks/use-auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { $Enums } from "@prisma/client";
import { getIsAdmin } from "@/actions/get-is-admin";
import { createFile } from "@/lib/create-file";
import { paginateData } from "@/lib/paginate-data";

export async function GET(req: Request) {
  try {
    const { url } = req;
    const { userId } = await auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const isAdmin = await getIsAdmin(userId);

    const query = new URL(url).searchParams.get("q") ?? "";
    const position = new URL(url).searchParams.get("ps") ?? "";
    const cabang = new URL(url).searchParams.get("c") ?? "";

    const whereClause: any = { name: { contains: query } };

    if (position) {
      whereClause.position = position as any;
    }

    if (isAdmin) {
      if (cabang) {
        whereClause.profile = { cabang: cabang as any };
      }
      const sponsors = await db.sponsor.findMany({
        where: whereClause,
        orderBy: {
          createdAt: "desc",
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

      const paginatesponsors = await paginateData(url, sponsors, 12);

      return NextResponse.json(
        { message: "Data matches", data: paginatesponsors },
        {
          status: 200,
        }
      );
    }
    whereClause.profileId = userId;

    const sponsors = await db.sponsor.findMany({
      where: whereClause,
      orderBy: {
        createdAt: "desc",
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

    const paginatesponsors = await paginateData(url, sponsors, 12);

    return NextResponse.json(
      { message: "Data matches", data: paginatesponsors },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.log("[ERROR_GET_SPONSOR]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const isAdmin = await getIsAdmin(userId);

    const data = await req.formData();
    const file: File | null = data.get("imageUrl") as unknown as File;
    const name: string = data.get("name") as unknown as string;
    const href: string = data.get("href") as unknown as string;
    const profileId: string = data.get("profileId") as unknown as string;
    const position: $Enums.SponsorEnum = data.get(
      "position"
    ) as unknown as $Enums.SponsorEnum;

    if (!name || !href || !position || !file || (isAdmin && !profileId)) {
      return new NextResponse(
        `[ ${!name ? "Name " : ""}${!href ? "Href " : ""}${
          !position ? "Position " : ""
        }${!file ? "Image " : ""}${
          isAdmin && !profileId ? "Kampus " : ""
        }] is required`,
        { status: 400 }
      );
    }

    const pathname = await createFile(file, name, "sponsorships", false);

    if (isAdmin) {
      await db.sponsor.create({
        data: {
          name: name,
          imageUrl: pathname,
          position: position,
          href: href,
          profileId: profileId,
        },
      });
    } else {
      await db.sponsor.create({
        data: {
          name: name,
          imageUrl: pathname,
          position: position,
          href: href,
          profileId: userId,
        },
      });
    }

    return NextResponse.json("Sponsor added success", {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
