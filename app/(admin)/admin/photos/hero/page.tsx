import { auth } from "@/hooks/use-auth";
import { PosterForm } from "./_components/client";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
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

const UpdateHeroPage = async () => {
  const { userId } = await auth();

  if (!userId) return redirect("/login");

  const isAdmin = await getIsAdmin(userId);

  return (
    <div className="flex flex-col gap-3 lg:gap-4 p-4 lg:p-6">
      <Header title="Hero Image" description="Begin your news with images" />
      <div className="w-full font-avenir font-normal flex text-sm mt-1 mb-3">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/admin/dashboard">Admin</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/admin/photos">Photo</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Hero Image</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <PosterForm userId={userId} isAdmin={isAdmin} />
    </div>
  );
};

export default UpdateHeroPage;
