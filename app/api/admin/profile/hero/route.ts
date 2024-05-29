import { auth } from "@/hooks/use-auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { mkdir, readdir, unlink, writeFile } from "fs/promises";
import path from "path";
import { getIsAdmin } from "@/actions/get-is-admin";

const mapCabang = [
  {
    label: "gontor-1",
    value: "PUTRA1",
  },
  {
    label: "gontor-3",
    value: "PUTRA3",
  },
  {
    label: "gontor-4",
    value: "PUTRA4",
  },
  {
    label: "gontor-5",
    value: "PUTRA5",
  },
  {
    label: "gontor-6",
    value: "PUTRA6",
  },
  {
    label: "gontor-7",
    value: "PUTRA7",
  },
  {
    label: "gontor-putri-1",
    value: "PUTRI1",
  },
  {
    label: "gontor-putri-3",
    value: "PUTRI3",
  },
  {
    label: "gontor-putri-4",
    value: "PUTRI4",
  },
  {
    label: "gontor-putri-7",
    value: "PUTRI7",
  },
];

export async function PATCH(req: Request) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const isAdmin = await getIsAdmin(userId);

    const data = await req.formData();
    const file: File | null = data.get("heroUrl") as unknown as File;
    const profileId: string = data.get("profileId") as unknown as string;

    if (!file) {
      return NextResponse.json({ success: false });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const existingFile = await db.profile.findFirst({
      where: {
        id: userId,
      },
    });

    if (!existingFile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (existingFile.heroUrl) {
      const currentPath = path.join(
        process.cwd() + "/public" + existingFile.heroUrl
      );

      await unlink(currentPath);
    }

    const nameHero = mapCabang.find(
      (item) => item.value === existingFile.cabang
    )?.label;

    const pathen = path.join(process.cwd() + "/public/images/hero");

    const nameFile = `${nameHero}.${file.type.split("/")[1]}`;

    const pathname = `/images/hero/${nameFile}`;

    try {
      await readdir(pathen);
    } catch (error) {
      await mkdir(pathen);
    }

    await writeFile(`${pathen}/${nameFile}`, buffer);

    if (isAdmin) {
      await db.profile.update({
        where: {
          id: profileId,
        },
        data: {
          heroUrl: pathname,
        },
      });
    } else {
      await db.profile.update({
        where: {
          id: userId,
        },
        data: {
          heroUrl: pathname,
        },
      });
    }

    return NextResponse.json("Hero Image added success", {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
