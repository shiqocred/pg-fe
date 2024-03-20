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
