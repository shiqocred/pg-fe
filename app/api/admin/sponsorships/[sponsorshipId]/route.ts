import { auth } from "@/hooks/use-auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { $Enums } from "@prisma/client";
import { createFile } from "@/lib/create-file";
import { deleteFile } from "@/lib/delete-file";

export async function DELETE(
  req: Request,
  { params }: { params: { sponsorshipId: string } }
) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const existingFile = await db.sponsor.findFirst({
      where: {
        id: params.sponsorshipId,
      },
      select: {
        imageUrl: true,
      },
    });

    if (!existingFile) {
      return new NextResponse("Sponsorship Id is require", { status: 400 });
    }

    if (existingFile.imageUrl) {
      await deleteFile(existingFile.imageUrl);
    }

    await db.sponsor.delete({
      where: {
        id: params.sponsorshipId,
      },
    });
    return NextResponse.json("Sponsorship deleted success", {
      status: 200,
    });
  } catch (error) {
    console.log("[ERROR_DELETE_SPONSORSHIP]", error);
    return NextResponse.json("Internal Error", {
      status: 500,
    });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { sponsorshipId: string } }
) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const data = await req.formData();
    const file: File | null = data.get("imageUrl") as unknown as File;
    const name: string = data.get("name") as unknown as string;
    const href: string = data.get("href") as unknown as string;
    const position: $Enums.SponsorEnum = data.get(
      "position"
    ) as unknown as $Enums.SponsorEnum;

    if (file) {
      const existingFile = await db.sponsor.findFirst({
        where: {
          id: params.sponsorshipId,
        },
      });

      if (!existingFile) {
        return new NextResponse("Sponsor id is require", { status: 400 });
      }

      if (existingFile.imageUrl) {
        await deleteFile(existingFile.imageUrl);
      }

      const pathname = await createFile(file, name, "sponsorships", false);

      await db.sponsor.update({
        where: {
          id: params.sponsorshipId,
        },
        data: {
          name: name,
          imageUrl: pathname,
          position: position,
          href: href,
        },
      });
    } else {
      await db.sponsor.update({
        where: {
          id: params.sponsorshipId,
        },
        data: {
          name: name,
          position: position,
          href: href,
        },
      });
    }

    return NextResponse.json("Sponsor updated success", {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
