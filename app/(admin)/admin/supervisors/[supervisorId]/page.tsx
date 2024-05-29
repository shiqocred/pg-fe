import { auth } from "@/hooks/use-auth";
import { SupervisorForm } from "./_components/supervisor-form";
import { db } from "@/lib/db";
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
import { getSupervisor } from "@/actions/get-supervisor";
import { getIsAdmin } from "@/actions/get-is-admin";

const CreateVideoPage = async ({
  params,
}: {
  params: { supervisorId: string };
}) => {
  const { userId } = await auth();

  const supervisor = await getSupervisor(params.supervisorId);

  if (!userId) return redirect("/login");

  const isAdmin = await getIsAdmin(userId);

  const formatedSupervisor = { ...supervisor, admin: isAdmin };

  if (
    (!supervisor || (supervisor?.profile?.id !== userId && !isAdmin)) &&
    params.supervisorId !== "create"
  ) {
    return redirect("/admin/supervisors/create");
  }

  return (
    <div className="flex flex-col gap-3 lg:gap-4 p-4 lg:p-6">
      <Header
        title={
          params.supervisorId === "create"
            ? "Create Supervisor Page"
            : "Edit Supervisor Page"
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
              <BreadcrumbLink href="/admin/supervisors">
                Supervisors
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>
                {params.supervisorId === "create" ? "Create" : "Edit"}
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <SupervisorForm initialData={formatedSupervisor} />
    </div>
  );
};

export default CreateVideoPage;
