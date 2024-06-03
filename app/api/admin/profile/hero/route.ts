import { auth } from "@/hooks/use-auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { getIsAdmin } from "@/actions/get-is-admin";
import { $Enums } from "@prisma/client";
import { createFile } from "@/lib/create-file";
import { deleteFile } from "@/lib/delete-file";

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
    const cabang: $Enums.CabangRole = data.get("cabang") as $Enums.CabangRole;

    if (!file) {
      return NextResponse.json({ success: false });
    }

    const existingFile = await db.profile.findFirst({
      where: {
        cabang,
      },
      select: {
        cabang: true,
        heroUrl: true,
      },
    });

    if (!existingFile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (existingFile.heroUrl) {
      await deleteFile(existingFile.heroUrl);
    }
    const nameHero = mapCabang.find(
      (item) => item.value === existingFile.cabang
    )?.label;

    const pathname = await createFile(file, nameHero ?? "", "hero", false);

    if (isAdmin) {
      const profileId = await db.profile.findFirst({
        where: {
          cabang,
        },
        select: {
          id: true,
        },
      });
      if (profileId?.id) {
        await db.profile.update({
          where: {
            id: profileId.id,
          },
          data: {
            heroUrl: pathname,
          },
        });
        return NextResponse.json("Hero Image added success", {
          status: 200,
        });
      }
    } else {
      await db.profile.update({
        where: {
          id: userId,
        },
        data: {
          heroUrl: pathname,
        },
      });
      return NextResponse.json("Hero Image added success", {
        status: 200,
      });
    }
  } catch (error) {
    console.log(error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
