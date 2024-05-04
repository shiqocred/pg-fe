import React from "react";
import { ClientAcara } from "./_components/client-acara";
import { auth } from "@/hooks/use-auth";
import { getDetailRoundown } from "@/actions/get-detail-roundown";

const RoundownIdPage = async ({
  params,
}: {
  params: { roundownId: string };
}) => {
  const { userId } = await auth();

  const detailAcara = await getDetailRoundown(userId ?? "", params.roundownId);

  console.log(detailAcara);
  return (
    <div className="flex flex-col gap-y-4 p-6">
      <ClientAcara initialData={detailAcara} />
    </div>
  );
};

export default RoundownIdPage;
