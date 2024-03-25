import { auth } from "@/hooks/use-auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { categoryId: string } }
) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!params.categoryId) {
      return new NextResponse("Category id is required", { status: 400 });
    }

    const values = await req.json();

    if (!values) {
      return new NextResponse("Missing required field", { status: 400 });
    }

    const ownerCategory = await db.profile.findFirst({
      where: {
        id: userId,
        caegories: {
          some: {
            id: params.categoryId,
          },
        },
      },
    });

    if (!ownerCategory) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    await db.category.update({
      where: {
        id: params.categoryId,
        profileId: userId,
      },
      data: {
        name: values.name,
      },
    });

    return NextResponse.json("Category updated success", { status: 200 });
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}