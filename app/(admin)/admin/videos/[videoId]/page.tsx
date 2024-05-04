import { auth } from "@/hooks/use-auth";
import { VideoForm } from "./_components/video-form";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { getCategories } from "@/actions/get-categories";

const CreateVideoPage = async ({ params }: { params: { videoId: string } }) => {
  const { userId } = await auth();

  const categories = await getCategories();

  const video = await db.video.findFirst({
    where: {
      id: params.videoId,
    },
  });

  if (!userId) return redirect("/login");

  if ((!video || video?.profileId !== userId) && params.videoId !== "create") {
    return redirect("/admin/videos/create");
  }

  return (
    <div className="flex flex-col gap-y-4 p-6">
      Create video Page
      <VideoForm initialData={video} categories={categories} />
    </div>
  );
};

export default CreateVideoPage;
