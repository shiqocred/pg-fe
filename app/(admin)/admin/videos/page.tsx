import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { VideoColumnsProps } from "./_components/columns";
import { auth } from "@/hooks/use-auth";
import { redirect } from "next/navigation";
import { VideoTable } from "./_components/video-table";
import { getVideos } from "@/actions/get-videos";

const VideosPage = async () => {
  const { userId } = await auth();

  if (!userId) return redirect("/login");

  const videos = await getVideos();

  const formatedVideos: VideoColumnsProps[] = videos.map((item) => ({
    id: item.id,
    title: item.title,
    category: item.category.name,
    description: item.description,
    videoUrl: item.videoUrl,
    isOwner: item.profile.id === userId,
    isPublish: item.isPublish,
  }));

  return (
    <div className="flex flex-col gap-y-4 p-6">
      Videos Page
      <Link href="/admin/videos/create">
        <Button>Create</Button>
      </Link>
      <VideoTable data={formatedVideos} />
    </div>
  );
};

export default VideosPage;
