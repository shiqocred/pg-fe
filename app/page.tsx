import { LogoutButton } from "@/components/logout-button";
import { Button } from "@/components/ui/button";
import { auth } from "@/hooks/use-auth";
import { db } from "@/lib/db";
import Link from "next/link";

export default async function Home() {
  const data = await auth();

  const user = await db.profile.findFirst({
    where: {
      id: data.userId,
    },
  });

  return (
    <div className="flex justify-center items-center h-full">
      {user ? (
        <div className="flex flex-col gap-4">
          <p>Username: {user.username}</p>
          <LogoutButton />
        </div>
      ) : (
        <Link href={"/login"}>
          <Button type="button">Login</Button>
        </Link>
      )}
    </div>
  );
}
