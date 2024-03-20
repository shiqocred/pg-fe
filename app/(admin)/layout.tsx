import { Button } from "@/components/ui/button";

import React, { ReactNode } from "react";
import { Navigations } from "./_components/navigations";

const AdminLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex w-full h-full">
      <div className="w-56 h-full bg-gray-100 flex-none flex flex-col p-6 gap-y-4">
        <h3 className="text-center font-bold">ADMIN</h3>
        <Navigations />
      </div>
      <div className="w-full h-full">{children}</div>
    </div>
  );
};

export default AdminLayout;
