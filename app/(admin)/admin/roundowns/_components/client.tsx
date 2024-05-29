"use client";

import React, { useEffect, useState } from "react";
import { TimeForm } from "./time-form";
import { Separator } from "@/components/ui/separator";
import { ClientRoundown } from "./client-roundown";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Header } from "@/components/header";
import { $Enums } from "@prisma/client";
import { ClientFaq } from "./client-faq";
import { getProfiles } from "@/actions/get-profiles";
import { getFaqs } from "@/actions/get-faq";
import { getRoundowns } from "@/actions/get-roundowns";
import { getProfile } from "@/actions/get-profile";
import { Card } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { mapCabang } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import { useCookies } from "next-client-cookies";

export interface InfoProps {
  id: string;
  waktu: string | null;
  tanggal: string | null;
  tempat: string | null;
  cabang: $Enums.CabangRole;
}

export interface RoundownsProps {
  profile: {
    id: string;
    cabang: $Enums.CabangRole;
  };
  id: string;
  title: string;
  imageUrl: string | null;
  position: number;
}
export interface FaqsProps {
  id: string;
  position: number;
  question: string;
  answer: string;
}

export const Client = ({
  userId,
  isAdmin,
}: {
  userId: string;
  isAdmin: boolean;
}) => {
  const [isMounted, setIsMounted] = useState(false);

  const [roundowns, setroundowns] = useState<RoundownsProps[]>([]);
  const [faqs, setFaqs] = useState<FaqsProps[]>([]);
  const [information, setInformation] = useState<InfoProps | null>(null);
  const [idProfile, setIdProfile] = useState("");

  const cookies = useCookies();
  const updated = cookies.get("updated");

  const [cabang, setCabang] = useState<string>("PUTRA1");

  const getRoundownsRes = async () => {
    const profileId = await getProfiles().then((res) => {
      return res.find((item) => item.cabang === cabang)?.id;
    });

    const roundownsRes = await getRoundowns(isAdmin ? profileId ?? "" : userId);

    setIdProfile(profileId ?? "");
    setroundowns(roundownsRes);
  };
  const getFaqsRes = async () => {
    const profileId = await getProfiles().then((res) => {
      return res.find((item) => item.cabang === cabang)?.id;
    });

    const faqsRes = await getFaqs(isAdmin ? profileId ?? "" : userId);

    setFaqs(faqsRes);
  };
  const getInformation = async () => {
    const profileId = await getProfiles().then((res) => {
      return res.find((item) => item.cabang === cabang)?.id;
    });

    const infoRes = await getProfile(isAdmin ? profileId ?? "" : userId);

    setInformation(infoRes);
  };

  useEffect(() => {
    getInformation();
    getRoundownsRes();
    getFaqsRes();
    if (updated) {
      cookies.remove("updated");
    }
  }, [cabang, updated]);

  useEffect(() => {
    setIsMounted(true);
    getInformation();
    getRoundownsRes();
    getFaqsRes();
  }, []);

  if (!isMounted) {
    return null;
  }
  return (
    <div>
      <Header
        title="Roundowns Page"
        description="Tanggal, waktu, tempat dan list roundowns"
      />
      <div className="w-full font-avenir font-normal flex text-sm mt-5 mb-5 lg:mb-8">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/admin/dashboard">Admin</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Roundowns</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      {isAdmin && (
        <Card className="flex md:items-center md:justify-between px-2 md:px-5 py-2 gap-2 bg-gray-200 flex-col md:flex-row mb-10 md:mb-5">
          <p className="text-gray-700 text-sm">Silahkan pilih kampus!</p>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="justify-between capitalize gap-4">
                {mapCabang
                  .find((item) => item.value === cabang)
                  ?.label.split("-")
                  .join(" ")}
                <ChevronDown className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {mapCabang.map((item) => (
                <DropdownMenuItem
                  key={item.value}
                  onClick={() => setCabang(item.value)}
                  className="capitalize"
                >
                  {mapCabang
                    .find((i) => i.value === item.value)
                    ?.label.split("-")
                    .join(" ")}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </Card>
      )}
      <TimeForm information={information} profileId={idProfile} />
      <Separator />
      <div className="flex gap-3 w-full flex-col md:flex-row">
        <div className="w-full">
          <ClientFaq initialData={faqs} profileId={idProfile} />
        </div>
        <div className="w-full">
          <ClientRoundown initialData={roundowns} profileId={idProfile} />
        </div>
      </div>
    </div>
  );
};
