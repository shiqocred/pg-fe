import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { SignJWT, jwtVerify } from "jose";
import { getJwtSecretKey } from "@/lib/auth";
import { cookies } from "next/headers";

export async function POST(req: Request) {
  try {
    const values = await req.json();

    if (!values.username || !values.password) {
      return new NextResponse("Missing require field", { status: 401 });
    }

    const existingUser = await db.profile.findFirst({
      where: {
        username: values.username,
      },
    });

    if (!existingUser) {
      return new NextResponse("Credential not match", { status: 401 });
    }

    const isVerified = bcrypt.compareSync(
      values.password,
      existingUser.password
    );

    if (!isVerified) {
      return new NextResponse("Credential not match", { status: 401 });
    }

    const token = await new SignJWT({
      ids: existingUser.id,
    })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("1W") // Set your own expiration time
      .sign(getJwtSecretKey());

    cookies().set({
      name: "token",
      value: token,
      path: "/",
    });

    const { payload } = await jwtVerify(token, getJwtSecretKey());

    const user = await db.profile.findFirst({
      where: {
        id: payload?.ids || "",
      },
    });

    return NextResponse.json(
      { status: "Success", payload: payload.ids, user: user?.username },
      { status: 200 }
    );
  } catch (error) {
    console.log("ini error", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
