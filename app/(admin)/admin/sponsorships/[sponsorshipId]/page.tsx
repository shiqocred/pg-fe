import { auth } from "@/hooks/use-auth";
import { SponsorshipForm } from "./_components/sponsorship-form";
import { redirect } from "next/navigation";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Header } from "@/components/header";
import { getSponsorship } from "@/actions/get-sponsorship";
import { getIsAdmin } from "@/actions/get-is-admin";

const CreateVideoPage = async ({
  params,
}: {
  params: { sponsorshipId: string };
}) => {
  const { userId } = await auth();

  const sponsorship = await getSponsorship(params.sponsorshipId);

  if (!userId) return redirect("/login");

  const isAdmin = await getIsAdmin(userId);

  const formatedSponsorship = { ...sponsorship, admin: isAdmin };

  if (
    (!sponsorship || (sponsorship?.profile?.id !== userId && !isAdmin)) &&
    params.sponsorshipId !== "create"
  ) {
    return redirect("/admin/sponsorships/create");
  }

  return (
    <div className="flex flex-col gap-3 lg:gap-4 p-4 lg:p-6">
      <Header
        title={
          params.sponsorshipId === "create"
            ? "Create Sponsorship Page"
            : "Edit Sponsorship Page"
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
              <BreadcrumbLink href="/admin/sponsorships">
                Sponsorships
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>
                {params.sponsorshipId === "create" ? "Create" : "Edit"}
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <SponsorshipForm initialData={formatedSponsorship} />
    </div>
  );
};

export default CreateVideoPage;
