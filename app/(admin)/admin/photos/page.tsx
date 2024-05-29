import React from "react";
import { auth } from "@/hooks/use-auth";
import { redirect } from "next/navigation";
import { VideoTable } from "./_components/poster-table";
import { getPosters } from "@/actions/get-posters";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Header } from "@/components/header";
import { db } from "@/lib/db";
import { getProfile } from "@/actions/get-profile";
import { getPhotos } from "@/actions/get-photos";
import { getHero } from "@/actions/get-hero";
import { getIsAdmin } from "@/actions/get-is-admin";

export interface PosterColumnsProps {
  id: string;
  title: string;
  category: string;
  posterUrl: string;
  isOwner: boolean;
  isPublish: boolean;
}

const PostersPage = async () => {
  const { userId } = await auth();

  if (!userId) return redirect("/login");

  const isAdmin = await getIsAdmin(userId);

  return (
    <div className="flex flex-col gap-3 lg:gap-4 p-4 lg:p-6">
      <Header title="Photos Page" description="BTS Photos" />
      <div className="w-full font-avenir font-normal flex text-sm mt-1 mb-3">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/admin/dashboard">Admin</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Photos</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <VideoTable userId={userId} isAdmin={isAdmin} />
    </div>
  );
};

export default PostersPage;
