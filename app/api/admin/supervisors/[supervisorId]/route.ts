import { auth } from "@/hooks/use-auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { mkdir, readdir, writeFile, unlink } from "fs/promises";
import path from "path";
import { $Enums } from "@prisma/client";

export async function PATCH(
  req: Request,
  { params }: { params: { supervisorId: string } }
) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const data = await req.formData();
    const file: File | null = data.get("imageUrl") as unknown as File;
    const name: string = data.get("name") as unknown as string;
    const position: string = data.get("position") as unknown as string;

    if (file) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const existingFile = await db.supervisor.findFirst({
        where: {
          id: params.supervisorId,
        },
      });

      if (!existingFile) {
        return new NextResponse("Supervisor id is require", { status: 400 });
      }

      if (existingFile.imageUrl) {
        const currentPath = path.join(
          process.cwd() + "/public" + existingFile.imageUrl
        );

        await unlink(currentPath);
      }

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

      await db.supervisor.update({
        where: {
          id: params.supervisorId,
        },
        data: {
          name: name,
          imageUrl: pathname,
          position:
            position === "Staff "
              ? $Enums.PositionSupervisor.STAFF
              : $Enums.PositionSupervisor.CHIEF,
        },
      });
    } else {
      await db.supervisor.update({
        where: {
          id: params.supervisorId,
        },
        data: {
          name: name,
          position:
            position === "Staff "
              ? $Enums.PositionSupervisor.STAFF
              : $Enums.PositionSupervisor.CHIEF,
        },
      });
    }

    return NextResponse.json("Poster updated success", {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
