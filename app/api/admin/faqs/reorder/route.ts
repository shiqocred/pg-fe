import { NextResponse } from "next/server";

import { db } from "@/lib/db";
import { auth } from "@/hooks/use-auth";

export async function PUT(req: Request) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { list } = await req.json();

    for (let item of list) {
      await db.faq.update({
        where: { id: item.id },
        data: { position: item.position },
      });
    }

    return NextResponse.json(
      { data: { status: true, message: "FAQ Berhasil Direorder" } },
      { status: 200 }
    );
  } catch (error) {
    console.log("[REORDER]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
