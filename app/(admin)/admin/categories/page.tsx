import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { DataTable } from "@/components/data-table";
import { CategoryColumnsProps, columns } from "./_components/columns";
import { auth } from "@/hooks/use-auth";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { CategoryTable } from "./_components/category-table";

const CategoriesPage = async () => {
  const { userId } = await auth();

  if (!userId) return redirect("/login");

  const categories = await db.category.findMany({
    orderBy: {
      name: "asc",
    },
    include: {
      profile: {
        include: {
          branches: true,
        },
      },
    },
  });

  const formatedCategories: CategoryColumnsProps[] = categories.map((item) => ({
    id: item.id,
    name: item.name,
    owner: item.profileId === userId,
    branch: item.profile.branches?.cabang ?? "",
  }));

  return (
    <div className="flex flex-col gap-y-4 p-6">
      Categories Page
      <Link href="categories/create">
        <Button>Create</Button>
      </Link>
      <CategoryTable data={formatedCategories} />
    </div>
  );
};

export default CategoriesPage;
