import React from "react";
import { auth } from "@/hooks/use-auth";
import { redirect } from "next/navigation";
import { VideoTable } from "./_components/poster-table";
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

export interface PosterColumnsProps {
  id: string;
  title: string;
  category: string;
  posterUrl: string;
  isPublish: boolean;
  cabang: string;
  date: string;
}

const PostersPage = async () => {
  const { userId } = await auth();

  if (!userId) return redirect("/login");

  const isAdmin = await getIsAdmin(userId);

  return (
    <div className="flex flex-col gap-3 lg:gap-4 p-4 lg:p-6">
      <Header title="Poster Page" description="Poster-poster" />
      <div className="w-full font-avenir font-normal flex text-sm mt-1 mb-3">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/admin/dashboard">Admin</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Posters</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <VideoTable isAdmin={isAdmin} />
    </div>
  );
};

export default PostersPage;
