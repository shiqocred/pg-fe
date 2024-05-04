import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CategoryColumnsProps } from "./_components/columns";
import { auth } from "@/hooks/use-auth";
import { redirect } from "next/navigation";
import { CategoryTable } from "./_components/category-table";
import { getCategories } from "@/actions/get-categories";

const CategoriesPage = async () => {
  const { userId } = await auth();

  if (!userId) return redirect("/login");

  const categories = await getCategories();

  const formatedCategories: CategoryColumnsProps[] = categories.map((item) => ({
    id: item.id,
    name: item.name,
    owner: item.profileId === userId,
    branch: item.profile.cabang ?? "",
  }));

  return (
    <div className="flex flex-col gap-y-4 p-6">
      Categories Page
      <Link href="/admin/categories/create">
        <Button>Create</Button>
      </Link>
      <CategoryTable data={formatedCategories} />
    </div>
  );
};

export default CategoriesPage;
