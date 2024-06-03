import React from "react";
import { auth } from "@/hooks/use-auth";
import { redirect } from "next/navigation";
import { SponsorClient } from "./_components/sponsor-client";
import { $Enums } from "@prisma/client";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Header } from "@/components/header";
import { getIsAdmin } from "@/actions/get-is-admin";

export interface SponsorshipsProps {
  id: string;
  name: string;
  imageUrl: string | null;
  href: string | null;
  position: $Enums.SponsorEnum;
  cabang: string;
  date: string;
}
export interface SponsorshipsResProps {
  id: string;
  name: string;
  imageUrl: string | null;
  href: string | null;
  position: $Enums.SponsorEnum;
  createdAt: Date;
  profile: {
    id: string;
    cabang: string;
  };
}

const PostersPage = async () => {
  const { userId } = await auth();

  if (!userId) return redirect("/login");

  const isAdmin = await getIsAdmin(userId);

  return (
    <div className="flex flex-col gap-3 lg:gap-4 p-4 lg:p-6">
      <Header
        title="Sponshorship Page"
        description="Without money we can't walk"
      />
      <div className="w-full font-avenir font-normal flex text-sm mt-1 mb-3">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/admin/dashboard">Admin</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Sponsorships</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <SponsorClient isAdmin={isAdmin} />
    </div>
  );
};

export default PostersPage;
