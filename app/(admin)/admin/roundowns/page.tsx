import React from "react";
import { auth } from "@/hooks/use-auth";
import { Client } from "./_components/client";
import { redirect } from "next/navigation";
import { getIsAdmin } from "@/actions/get-is-admin";

const RoundownPage = async () => {
  const { userId } = await auth();

  if (!userId) redirect("/auth/login");
  const isAdmin = await getIsAdmin(userId);

  return (
    <div className="flex flex-col gap-3 lg:gap-4 p-4 lg:p-6">
      <Client userId={userId} isAdmin={isAdmin} />
    </div>
  );
};

export default RoundownPage;
