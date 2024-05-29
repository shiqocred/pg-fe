"use client";

import { DataTable } from "@/components/data-table";
import React, { useEffect, useState } from "react";
import { CategoryColumnsProps, columnsCategory } from "./columns";
import { PlusCircle, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const CategoryTable = ({ data }: { data: CategoryColumnsProps[] }) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, [data]);

  if (!isMounted) {
    return null;
  }
  return (
    <div className="">
      <div className="flex w-full justify-between items-center mb-3 flex-col md:flex-row gap-3">
        <div className="lg:max-w-lg md:max-w-sm relative w-full">
          <Search className="absolute top-2.5 left-3 w-4 h-4" />
          <Input
            className="pl-10 h-9 focus-visible:ring-1 focus-visible:ring-offset-0 border-gray-400"
            autoFocus
          />
        </div>
        <Link href="/admin/categories/create" className="w-full md:w-auto">
          <Button className="h-9 w-full">
            <PlusCircle className="w-4 h-4 mr-2" />
            Add Category
          </Button>
        </Link>
      </div>
      <DataTable columns={columnsCategory} data={data} />
    </div>
  );
};
