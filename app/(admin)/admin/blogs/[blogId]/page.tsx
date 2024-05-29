import { auth } from "@/hooks/use-auth";
import { BlogsForm } from "./_components/blog-form";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
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
import { getBlog } from "@/actions/get-blog";
import { getIsAdmin } from "@/actions/get-is-admin";

const CreateBlogsPage = async ({ params }: { params: { blogId: string } }) => {
  const { userId } = await auth();

  const blog = await getBlog(params.blogId);

  if (!userId) return redirect("/login");
  const isAdmin = await getIsAdmin(userId);

  const formatedBlog = { ...blog, admin: isAdmin };

  if (
    (!blog || (blog?.profile?.id !== userId && !isAdmin)) &&
    params.blogId !== "create"
  ) {
    return redirect("/admin/blogs/create");
  }

  return (
    <div className="flex flex-col gap-3 lg:gap-4 p-4 lg:p-6">
      <Header
        title={
          params.blogId === "create" ? "Create Blog Page" : "Edit Blog Page"
        }
        description="Begin your news with word"
      />
      <div className="w-full font-avenir font-normal flex text-sm mt-1 mb-3">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/admin/dashboard">Admin</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/admin/blogs">Blog</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>
                {params.blogId === "create" ? "Create" : "Edit"}
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <BlogsForm initialData={formatedBlog} />
    </div>
  );
};

export default CreateBlogsPage;
