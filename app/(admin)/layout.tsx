import { Button } from "@/components/ui/button";

import React, { ReactNode } from "react";
import { Navigations } from "./_components/navigations";
import { auth } from "@/hooks/use-auth";
import { db } from "@/lib/db";
import { getProfile } from "@/actions/get-profile";
import { getIsAdmin } from "@/actions/get-is-admin";
import { redirect } from "next/navigation";
import { Navbar } from "./_components/navbar";

const AdminLayout = async ({ children }: { children: ReactNode }) => {
  const { userId } = await auth();

  if (!userId) redirect("/login");

  const currentLogin = await getProfile(userId ?? "");

  const isAdmin = await getIsAdmin(userId);

  const currentFormated = {
    id: userId,
    cabang: currentLogin?.cabang,
    isAdmin: isAdmin,
  };
  return (
    <div className="flex w-full h-screen overflow-hidden relative bg-gray-100 flex-col lg:flex-row">
      <div className="w-56 h-screen flex-none lg:flex flex-col p-6 gap-y-4 hidden">
        <h3 className="text-center font-bold">ADMIN</h3>
        <Navigations {...currentFormated} />
      </div>
      <Navbar {...currentFormated} />
      <div className="w-full h-full bg-white overflow-y-scroll">{children}</div>
    </div>
  );
};

export default AdminLayout;
