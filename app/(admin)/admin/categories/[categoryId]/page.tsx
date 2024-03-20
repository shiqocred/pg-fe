import { auth } from "@/hooks/use-auth";
import { CategoryForm } from "./_components/category-form";
import { db } from "@/lib/db";
import { redirect, usePathname } from "next/navigation";

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

  if (
    (!category || category?.profileId !== userId) &&
    params.categoryId !== "create"
  ) {
    return redirect("/admin/categories/create");
  }

  return (
    <div className="flex flex-col gap-y-4 p-6">
      Create Category Page
      <CategoryForm initialData={category} />
    </div>
  );
};

export default CreateCategoryPage;
