import { auth } from "@/hooks/use-auth";
import { PosterForm } from "./_components/poster-form";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { getCategories } from "@/actions/get-categories";

const CreateVideoPage = async ({
  params,
}: {
  params: { posterId: string };
}) => {
  const { userId } = await auth();

  const categories = await getCategories();

  const poster = await db.poster.findFirst({
    where: {
      id: params.posterId,
    },
  });

  if (!userId) return redirect("/login");

  if (
    (!poster || poster?.profileId !== userId) &&
    params.posterId !== "create"
  ) {
    return redirect("/admin/posters/create");
  }

  return (
    <div className="flex flex-col gap-y-4 p-6">
      Create Poster Page
      <PosterForm initialData={poster} categories={categories} />
    </div>
  );
};

export default CreateVideoPage;
