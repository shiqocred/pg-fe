import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { PosterColumnsProps } from "./_components/columns";
import { auth } from "@/hooks/use-auth";
import { redirect } from "next/navigation";
import { VideoTable } from "./_components/poster-table";
import { getPosters } from "@/actions/get-posters";

const PostersPage = async () => {
  const { userId } = await auth();

  if (!userId) return redirect("/login");

  const posters = await getPosters();

  const formatedPosters: PosterColumnsProps[] = posters.map((item) => ({
    id: item.id,
    title: item.title,
    category: item.category.name,
    description: item.description,
    posterUrl: item.posterUrl,
    isOwner: item.profile.id === userId,
    isPublish: item.isPublish,
  }));

  return (
    <div className="flex flex-col gap-y-4 p-6">
      Posters Page
      <Link href="/admin/posters/create">
        <Button>Create</Button>
      </Link>
      <VideoTable data={formatedPosters} />
    </div>
  );
};

export default PostersPage;
