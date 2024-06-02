import { auth } from "@/hooks/use-auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { mkdir, readdir, writeFile } from "fs/promises";
import path from "path";
import { getIsAdmin } from "@/actions/get-is-admin";
import { $Enums } from "@prisma/client";

export async function POST(req: Request) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const isAdmin = await getIsAdmin(userId);

    const data = await req.formData();
    const file: File | null = data.get("imageUrl") as unknown as File;
    const title: string = data.get("title") as unknown as string;
    const cabang: $Enums.CabangRole = data.get("cabang") as $Enums.CabangRole;

    if (isAdmin) {
      const profileId = await db.profile.findFirst({
        where: {
          cabang: cabang,
        },
        select: {
          id: true,
        },
      });

      if (!profileId?.id) {
        return new NextResponse("Cabang invalid", { status: 400 });
      }

      const lastAcara = await db.roundown.findFirst({
        where: {
          profileId: profileId.id,
        },
        orderBy: {
          position: "desc",
        },
      });

      const newPosition = lastAcara ? lastAcara.position + 1 : 1;

      if (!file) {
        await db.roundown.create({
          data: {
            title: title,
            position: newPosition,
            profileId: profileId.id,
          },
        });

        return NextResponse.json(
          { message: "Roundown added success", isAdmin: true },
          {
            status: 200,
          }
        );
      }

      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const pathen = path.join(process.cwd() + "/public/images/roundowns");

      const nameFile = `${
        Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000
      }-${title.toLocaleLowerCase().split(" ").join("_")}.${
        file.type.split("/")[1]
      }`;

      const pathname = `/images/roundowns/${nameFile}`;

      try {
        await readdir(pathen);
      } catch (error) {
        await mkdir(pathen);
      }

      await writeFile(`${pathen}/${nameFile}`, buffer);

      await db.roundown.create({
        data: {
          title: title,
          imageUrl: pathname,
          position: newPosition,
          profileId: profileId.id,
        },
      });

      return NextResponse.json(
        { message: "Roundown added success", isAdmin: true },
        {
          status: 200,
        }
      );
    }

    const lastAcara = await db.roundown.findFirst({
      where: {
        profileId: userId,
      },
      orderBy: {
        position: "desc",
      },
    });

    const newPosition = lastAcara ? lastAcara.position + 1 : 1;

    if (!file) {
      await db.roundown.create({
        data: {
          title: title,
          position: newPosition,
          profileId: userId,
        },
      });

      return NextResponse.json(
        { message: "Roundown added success", isAdmin: false },
        {
          status: 200,
        }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const pathen = path.join(process.cwd() + "/public/images/roundowns");

    const nameFile = `${
      Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000
    }-${title.toLocaleLowerCase().split(" ").join("_")}.${
      file.type.split("/")[1]
    }`;

    const pathname = `/images/roundowns/${nameFile}`;

    try {
      await readdir(pathen);
    } catch (error) {
      await mkdir(pathen);
    }

    await writeFile(`${pathen}/${nameFile}`, buffer);

    await db.roundown.create({
      data: {
        title: title,
        imageUrl: pathname,
        position: newPosition,
        profileId: userId,
      },
    });

    return NextResponse.json(
      { message: "Roundown added success", isAdmin: false },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.log(error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
