import { auth } from "@/hooks/use-auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { mkdir, readdir, writeFile, unlink } from "fs/promises";
import path from "path";
import { $Enums } from "@prisma/client";

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
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const existingFile = await db.sponsor.findFirst({
        where: {
          id: params.sponsorshipId,
        },
      });

      if (!existingFile) {
        return new NextResponse("Sponsor id is require", { status: 400 });
      }

      if (existingFile.imageUrl) {
        const currentPath = path.join(
          process.cwd() + "/public" + existingFile.imageUrl
        );

        await unlink(currentPath);
      }

      const pathen = path.join(process.cwd() + "/public/images/sponsorships");

      const nameFile = `${
        Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000
      }-${name.toLocaleLowerCase().split(" ").join("_")}.${
        file.type.split("/")[1]
      }`;

      const pathname = `/images/sponsorships/${nameFile}`;

      try {
        await readdir(pathen);
      } catch (error) {
        await mkdir(pathen);
      }

      await writeFile(`${pathen}/${nameFile}`, buffer);

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
