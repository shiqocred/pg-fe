import { auth } from "@/hooks/use-auth";
import { CategoryForm } from "./_components/category-form";
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

const CreateCategoryPage = async ({
  params,
}: {
  params: { categoryId: string };
}) => {
  const { userId } = await auth();

  const category = await db.category.findUnique({
    where: {
      id: params.categoryId,
    },
  });

  if (!userId) return redirect("/login");

  const isAdmin = await getIsAdmin(userId);

  if (!isAdmin) return redirect("/admin/dashboard");

  if (
    (!category || category?.profileId !== userId) &&
    params.categoryId !== "create"
  ) {
    return redirect("/admin/categories/create");
  }

  return (
    <div className="flex flex-col gap-3 lg:gap-4 p-4 lg:p-6">
      <Header
        title={
          params.categoryId === "create"
            ? "Create Category Page"
            : "Edit Category Page"
        }
        description="Tags is simple"
      />
      <div className="w-full font-avenir font-normal flex text-sm mt-1 mb-3">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/admin/dashboard">Admin</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/admin/categories">
                Categories
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>
                {params.categoryId === "create" ? "Create" : "Edit"}
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <CategoryForm initialData={category} />
    </div>
  );
};

export default CreateCategoryPage;
