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
import { mapCabang } from "@/lib/utils";
import { formatDistanceStrict } from "date-fns";
import { id as indonesia } from "date-fns/locale";

export interface PosterColumnsProps {
  id: string;
  title: string;
  category: string;
  posterUrl: string;
  isPublish: boolean;
  cabang: string;
  isAdmin: boolean;
  date: string;
}

const PostersPage = async () => {
  const { userId } = await auth();

  if (!userId) return redirect("/login");

  const posters = await getPosters(userId);

  const formatedPosters: PosterColumnsProps[] = posters.map((item) => ({
    id: item.id,
    title: item.title,
    category: item.category.name,
    posterUrl: item.posterUrl,
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
    isPublish: item.isPublish,
    isAdmin: item.admin,
  }));

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
      <VideoTable data={formatedPosters} />
    </div>
  );
};

export default PostersPage;
