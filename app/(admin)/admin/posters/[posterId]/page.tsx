import { auth } from "@/hooks/use-auth";
import { PosterForm } from "./_components/poster-form";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { getCategories } from "@/actions/get-categories";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Header } from "@/components/header";
import { getPoster } from "@/actions/get-poster";
import { getIsAdmin } from "@/actions/get-is-admin";

const CreateVideoPage = async ({
  params,
}: {
  params: { posterId: string };
}) => {
  const { userId } = await auth();

  const poster = await getPoster(params.posterId);

  if (!userId) return redirect("/login");

  const isAdmin = await getIsAdmin(userId);

  const formatedPoster = { ...poster, admin: isAdmin };

  if (
    (!poster || (poster?.profile?.id !== userId && !isAdmin)) &&
    params.posterId !== "create"
  ) {
    return redirect("/admin/posters/create");
  }

  return (
    <div className="flex flex-col gap-3 lg:gap-4 p-4 lg:p-6">
      <Header
        title={
          params.posterId === "create"
            ? "Create Poster Page"
            : "Edit Poster Page"
        }
        description="Begin your news with images"
      />
      <div className="w-full font-avenir font-normal flex text-sm mt-1 mb-3">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/admin/dashboard">Admin</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/admin/posters">Poster</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>
                {params.posterId === "create" ? "Create" : "Edit"}
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <PosterForm initialData={formatedPoster} />
    </div>
  );
};

export default CreateVideoPage;
