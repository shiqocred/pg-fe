import { auth } from "@/hooks/use-auth";
import { VideoForm } from "./_components/video-form";
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
import { getVideo } from "@/actions/get-video";
import { getIsAdmin } from "@/actions/get-is-admin";

const CreateVideoPage = async ({ params }: { params: { videoId: string } }) => {
  const { userId } = await auth();

  const video = await getVideo(params.videoId);

  if (!userId) return redirect("/login");
  const isAdmin = await getIsAdmin(userId);

  const formatedVideo = { ...video, admin: isAdmin };

  if (
    (!video || (video?.profile?.id !== userId && !isAdmin)) &&
    params.videoId !== "create"
  ) {
    return redirect("/admin/videos/create");
  }

  return (
    <div className="flex flex-col gap-3 lg:gap-4 p-4 lg:p-6">
      <Header
        title={
          params.videoId === "create" ? "Create Video Page" : "Edit Video Page"
        }
        description="Begin your news with images"
      />
      <div className="w-full font-avenir font-normal flex text-sm mt-1 mb-3">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/admin/dashboard">Admin</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/admin/video">Video</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>
                {params.videoId === "create" ? "Create" : "Edit"}
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <VideoForm initialData={formatedVideo} />
    </div>
  );
};

export default CreateVideoPage;
