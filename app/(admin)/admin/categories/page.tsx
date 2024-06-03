import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CategoryColumnsProps } from "./_components/columns";
import { auth } from "@/hooks/use-auth";
import { redirect } from "next/navigation";
import { CategoryTable } from "./_components/category-table";
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

const CategoriesPage = async () => {
  const { userId } = await auth();

  if (!userId) return redirect("/login");

  const isAdmin = await getIsAdmin(userId);

  if (!isAdmin) return redirect("/admin/dashboard");

  return (
    <div className="flex flex-col gap-3 lg:gap-4 p-4 lg:p-6">
      <Header title="Categories Page" description="Resize with tags" />
      <div className="w-full font-avenir font-normal flex text-sm mt-1 mb-3">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/admin/dashboard">Admin</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Categories</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <CategoryTable />
    </div>
  );
};

export default CategoriesPage;
