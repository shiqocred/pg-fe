import { auth } from "@/hooks/use-auth";
import { BlogsForm } from "./_components/blog-form";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { getCategories } from "@/actions/get-categories";

const CreateBlogsPage = async ({ params }: { params: { blogId: string } }) => {
  const { userId } = await auth();

  const categories = await getCategories();

  const blog = await db.post.findUnique({
    where: {
      id: params.blogId,
    },
  });

  if (!userId) return redirect("/login");

  if ((!blog || blog?.profileId !== userId) && params.blogId !== "create") {
    return redirect("/admin/blogs/create");
  }

  return (
    <div className="flex flex-col gap-y-4 p-6">
      Create blog Page
      <BlogsForm initialData={blog} categories={categories} />
    </div>
  );
};

export default CreateBlogsPage;
