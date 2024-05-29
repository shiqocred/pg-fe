import { auth } from "@/hooks/use-auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { mkdir, readdir, writeFile } from "fs/promises";
import path from "path";
import { $Enums } from "@prisma/client";
import { getIsAdmin } from "@/actions/get-is-admin";

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
    const position: string = data.get("position") as unknown as string;
    const profileId: string = data.get("profileId") as unknown as string;

    if (!file) {
      return NextResponse.json({ success: false });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const pathen = path.join(process.cwd() + "/public/images/supervisors");

    const nameFile = `${
      Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000
    }-${name.toLocaleLowerCase().split(" ").join("_")}.${
      file.type.split("/")[1]
    }`;

    const pathname = `/images/supervisors/${nameFile}`;

    try {
      await readdir(pathen);
    } catch (error) {
      await mkdir(pathen);
    }

    await writeFile(`${pathen}/${nameFile}`, buffer);

    if (isAdmin) {
      await db.supervisor.create({
        data: {
          name: name,
          imageUrl: pathname,
          position:
            position === "Staff "
              ? $Enums.PositionSupervisor.STAFF
              : $Enums.PositionSupervisor.CHIEF,
          profileId: profileId,
        },
      });
    } else {
      await db.supervisor.create({
        data: {
          name: name,
          imageUrl: pathname,
          position:
            position === "Staff "
              ? $Enums.PositionSupervisor.STAFF
              : $Enums.PositionSupervisor.CHIEF,
          profileId: userId,
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