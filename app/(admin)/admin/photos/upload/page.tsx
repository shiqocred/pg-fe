import { auth } from "@/hooks/use-auth";
import { UploadForm } from "./_components/upload-form";
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
import { getIsAdmin } from "@/actions/get-is-admin";

const UploadPhotoPage = async ({
  params,
}: {
  params: { posterId: string };
}) => {
  const { userId } = await auth();

  if (!userId) return redirect("/login");

  const isAdmin = await getIsAdmin(userId);

  return (
    <div className="flex flex-col gap-3 lg:gap-4 p-4 lg:p-6">
      <Header title="Upload Photos" description="World in a picture" />
      <div className="w-full font-avenir font-normal flex text-sm mt-1 mb-3">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/admin/dashboard">Admin</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/admin/photos">Photos</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Upload</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <UploadForm userId={userId} isAdmin={isAdmin} />
    </div>
  );
};

export default UploadPhotoPage;
