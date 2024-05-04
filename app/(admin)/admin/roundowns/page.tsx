import { Separator } from "@/components/ui/separator";
import React from "react";
import { TimeForm } from "./_components/time-form";
import { ClientRoundown } from "./_components/client-roundown";
import { getRoundowns } from "@/actions/get-roundowns";
import { auth } from "@/hooks/use-auth";

const RoundownPage = async () => {
  const user = await auth();

  const roundowns = await getRoundowns(user.userId ?? "");

  return (
    <div className="flex flex-col gap-y-4 p-6">
      Waktu, tanggal dan tempat Acara
      <TimeForm />
      <Separator />
      <ClientRoundown initialData={roundowns} />
    </div>
  );
};

export default RoundownPage;
