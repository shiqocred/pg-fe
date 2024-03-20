import { verifyJwtToken } from "@/lib/auth";
import { db } from "@/lib/db";
import { cookies } from "next/headers";

interface VerifyProps {
  ids: string;
}

export const auth = async () => {
  const cookieList = cookies();
  const token = cookieList.get("token")?.value ?? "";
  const verifiedToken = await verifyJwtToken(token);

  const user = await db.profile.findFirst({
    where: {
      id: verifiedToken?.ids || "",
    },
  });

  const response = {
    userId: user?.id,
    getToken: token ?? "",
  };

  return response;
};
