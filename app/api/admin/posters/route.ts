import { auth } from "@/hooks/use-auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";
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
    const status = new URL(url).searchParams.get("s") ?? "";
    const cabang = new URL(url).searchParams.get("c") ?? "";

    const whereClause: any = { title: { contains: query } };

    if (status === "draft" || status === "isPublish") {
      whereClause.isPublish =
        (status === "draft" && false) || (status === "isPublish" && true);
    }

    if (isAdmin) {
      if (cabang) {
        whereClause.profile = { cabang: cabang as any };
      }
      const posters = await db.poster.findMany({
        where: whereClause,
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

      const paginateposters = await paginateData(url, posters, 12);

      return NextResponse.json(
        { message: "Data poster matches", data: paginateposters },
        {
          status: 200,
        }
      );
    }
    whereClause.profileId = userId;

    const posters = await db.poster.findMany({
      where: whereClause,
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

    const paginateposters = await paginateData(url, posters, 12);

    return NextResponse.json(
      { message: "Data poster matches", data: paginateposters },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.log("[ERROR_GET_POSTERS]", error);
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
    const file: File | null = data.get("posterUrl") as unknown as File;
    const title: string = data.get("title") as unknown as string;
    const category: string = data.get("category") as unknown as string;
    const isPublish: string = data.get("isPublish") as unknown as string;
    const profileId: string = data.get("profileId") as unknown as string;

    if (!title || !category || !file || (isAdmin && !profileId)) {
      return new NextResponse(
        `[ ${!title ? "Title " : ""}${!category ? "Category " : ""}${
          !file ? "Image " : ""
        }${isAdmin && !profileId ? "Kampus " : ""}] is required`,
        { status: 400 }
      );
    }

    const pathname = await createFile(file, title, "posters", false);

    if (isAdmin) {
      await db.poster.create({
        data: {
          title: title,
          posterUrl: pathname,
          categoryId: category,
          profileId: profileId,
          isPublish: isPublish === "true",
        },
      });
    } else {
      await db.poster.create({
        data: {
          title: title,
          posterUrl: pathname,
          categoryId: category,
          profileId: userId,
          isPublish: isPublish === "true",
        },
      });
    }

    return NextResponse.json("Poster added success", {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
