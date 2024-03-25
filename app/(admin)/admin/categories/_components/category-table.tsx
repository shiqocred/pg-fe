"use client";

import { DataTable } from "@/components/data-table";
import React, { useEffect, useState } from "react";
import { CategoryColumnsProps, columnsCategory } from "./columns";

export const CategoryTable = ({ data }: { data: CategoryColumnsProps[] }) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, [data]);

  if (!isMounted) {
    return null;
  }
  return <DataTable columns={columnsCategory} data={data} />;
};
