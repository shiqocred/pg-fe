import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { auth } from "@/hooks/use-auth";
import { redirect } from "next/navigation";
import { SponsorClient } from "./_components/sponsor-client";
import { getPosters } from "@/actions/get-posters";
import { getSupervisors } from "@/actions/get-supervisors";
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
import { getSponsorships } from "@/actions/get-sponsorships";
import { mapCabang } from "@/lib/utils";
import { formatDistanceStrict } from "date-fns";
import { id as indonesia } from "date-fns/locale";

export interface SponsorshipsProps {
  id: string;
  name: string;
  imageUrl: string | null;
  href: string | null;
  position: $Enums.SponsorEnum;
  cabang: string;
  date: string;
  isAdmin: boolean;
}
export interface SponsorshipsResProps {
  id: string;
  name: string;
  imageUrl: string | null;
  href: string | null;
  position: $Enums.SponsorEnum;
  admin: boolean;
  createdAt: Date;
  profile: {
    id: string;
    cabang: string;
  };
}

const PostersPage = async () => {
  const { userId } = await auth();

  if (!userId) return redirect("/login");

  const sponsorships: SponsorshipsResProps[] = await getSponsorships(userId);

  const formatedSupervisors: SponsorshipsProps[] = sponsorships.map((item) => ({
    id: item.id,
    name: item.name,
    imageUrl: item.imageUrl,
    href: item.href,
    position: item.position,
    cabang:
      mapCabang
        .find((i) => i.value === item.profile.cabang)
        ?.label.split("-")
        .join(" ") ?? item.profile.cabang,
    date: formatDistanceStrict(
      item.createdAt.toString(),
      new Date().toString(),
      {
        addSuffix: true,
        locale: indonesia,
      }
    ),
    isAdmin: item.admin,
  }));

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
      <SponsorClient data={formatedSupervisors} />
    </div>
  );
};

export default PostersPage;
