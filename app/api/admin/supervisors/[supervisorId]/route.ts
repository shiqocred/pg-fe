import { auth } from "@/hooks/use-auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { createFile } from "@/lib/create-file";
import { deleteFile } from "@/lib/delete-file";

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
      const existingFile = await db.supervisor.findFirst({
        where: {
          id: params.supervisorId,
        },
      });

      if (!existingFile) {
        return new NextResponse("Supervisor id is require", { status: 400 });
      }

      if (existingFile.imageUrl) {
        await deleteFile(existingFile.imageUrl);
      }

      const pathname = await createFile(file, name, "supervisors", false);

      await db.supervisor.update({
        where: {
          id: params.supervisorId,
        },
        data: {
          name: name,
          imageUrl: pathname,
          position: position as any,
        },
      });
    } else {
      await db.supervisor.update({
        where: {
          id: params.supervisorId,
        },
        data: {
          name: name,
          position: position as any,
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
