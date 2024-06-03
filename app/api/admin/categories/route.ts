import { auth } from "@/hooks/use-auth";
import { db } from "@/lib/db";
import { paginateData } from "@/lib/paginate-data";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const { url } = req;
    const { userId } = await auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const query = new URL(url).searchParams.get("q") ?? "";

    const category = await db.category.findMany({
      where: { name: { contains: query } },
      orderBy: {
        createdAt: "desc",
      },
      select: {
        id: true,
        name: true,
        profileId: true,
        profile: {
          select: {
            id: true,
            cabang: true,
          },
        },
      },
    });

    const paginateCategory = await paginateData(url, category, 12);

    return NextResponse.json(
      { message: "Data matches", data: paginateCategory },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.log("[ERROR_GET_BLOGS]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

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

    const existingCategory = await db.category.findFirst({
      where: {
        name: values.name,
      },
    });

    if (existingCategory) {
      return new NextResponse("Category name has match", { status: 400 });
    }

    await db.category.create({
      data: {
        name: values.name,
        profileId: userId,
      },
    });

    return NextResponse.json("Category added success", { status: 200 });
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}
