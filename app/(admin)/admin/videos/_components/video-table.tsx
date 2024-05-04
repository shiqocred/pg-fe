"use client";

import { DataTable } from "@/components/data-table";
import React, { useEffect, useState } from "react";
import { VideoColumnsProps, columns } from "./columns";

export const VideoTable = ({ data }: { data: VideoColumnsProps[] }) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, [data]);

  if (!isMounted) {
    return null;
  }
  return <DataTable columns={columns} data={data} />;
};
