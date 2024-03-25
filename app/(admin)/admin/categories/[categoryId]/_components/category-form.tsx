"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Category } from "@prisma/client";
import axios from "axios";
import { revalidatePath } from "next/cache";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { z } from "zod";

const formSchema = z.object({
  name: z.string().min(1, {
    message: "Name Category is required",
  }),
});

interface CategoryPageProps {
  initialData: Category | null;
}

export const CategoryForm = ({ initialData }: CategoryPageProps) => {
  const [isMounted, setIsMounted] = useState(false);
  const params = useParams();
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      name: "",
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const title = initialData ? "Edit Category Form" : "Create Category Form";
  const label = initialData ? "Edit" : "Create";

  function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      if (!initialData) {
        // add
        axios
          .post("/api/admin/categories", values)
          .then((response) => {
            toast.success(response.data);
            router.push("/admin/categories");
            router.refresh();
          })
          .catch((error) => toast.error(error.response.data));
      } else {
        // edit
        axios
          .patch(`/api/admin/categories/${params.categoryId}`, values)
          .then((response) => {
            toast.success(response.data);
            router.push("/admin/categories");
            router.refresh();
          })
          .catch((error) => toast.error(error.response.data));
      }
    } catch (error) {
      toast.success("Something went wrong");
    }
  }

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }
  return (
    <div className="flex flex-col gap-y-2 w-full max-w-2xl">
      {title}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nama Kategori</FormLabel>
                <FormControl>
                  <Input
                    placeholder="nama kategori"
                    {...field}
                    disabled={isSubmitting}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className="mt-2" disabled={isSubmitting || !isValid}>
            {label}
          </Button>
        </form>
      </Form>
    </div>
  );
};
