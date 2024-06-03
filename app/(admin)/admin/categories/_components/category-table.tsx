"use client";

import { DataTable } from "@/components/data-table";
import React, { useEffect, useState } from "react";
import { CategoryColumnsProps, columnsCategory } from "./columns";
import { ChevronLeft, ChevronRight, PlusCircle, Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useDebounce } from "@/hooks/use-debounce";
import axios from "axios";
import { useCookies } from "next-client-cookies";

export const CategoryTable = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [categories, setCategories] = useState<CategoryColumnsProps[]>([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [search, setSearch] = useState("");
  const searchValue = useDebounce(search);
  const cookies = useCookies();

  const handleGetBlogs = async () => {
    try {
      const res = await axios.get(
        `/api/admin/categories?p=${page}&q=${searchValue}`
      );
      const data = res.data.data.data;
      setCategories(data);
      setTotalPage(res.data.data.last_page);
    } catch (error) {
      console.log(["ERROR_GET_CATEGORIES:"], error);
    }
  };

  useEffect(() => {
    setIsMounted(true);
    handleGetBlogs();
    if (cookies.get("updated")) {
      cookies.remove("updated");
    }
  }, [searchValue, page, cookies.get("updated")]);
  useEffect(() => {
    setIsMounted(true);
    handleGetBlogs();
  }, []);

  if (!isMounted) {
    return null;
  }
  return (
    <div className="">
      <div className="flex w-full justify-between items-center mb-3 flex-col md:flex-row gap-3">
        <div className="max-w-lg relative w-full">
          <Search className="absolute top-2.5 left-3 w-4 h-4" />
          {search && (
            <Button
              className="p-0 h-6 w-6 absolute right-2 top-1.5"
              type="button"
              onClick={() => setSearch("")}
              variant={"ghost"}
            >
              <X className="w-4 h-4" />
            </Button>
          )}
          <Input
            className="pl-10 h-9 focus-visible:ring-1 focus-visible:ring-offset-0 border-gray-400"
            onChange={(e) => setSearch(e.target.value)}
            value={search}
          />
        </div>
        <Link href="/admin/categories/create" className="w-full md:w-auto">
          <Button className="h-9 w-full">
            <PlusCircle className="w-4 h-4 mr-2" />
            Add Category
          </Button>
        </Link>
      </div>
      <div className="flex flex-col gap-3">
        <DataTable columns={columnsCategory} data={categories} />
        <div className="flex gap-5 ml-auto items-center">
          <p className="text-sm">
            Page {page} of {totalPage}
          </p>
          <div className="flex items-center gap-2">
            <Button
              className="p-0 h-8 w-8"
              disabled={page === 1}
              onClick={() => setPage((prev) => prev - 1)}
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <Button
              className="p-0 h-8 w-8"
              disabled={page === totalPage}
              onClick={() => setPage((prev) => prev + 1)}
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
