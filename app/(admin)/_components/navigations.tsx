"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { LucideIcon, LucideProps } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Images, Layers3, MonitorPlay, Newspaper } from "lucide-react";

const menuMap = [
  { label: "Beranda", href: "/admin/dashboard", icon: Home },
  { label: "Category", href: "/admin/categories", icon: Layers3 },
  { label: "Blog", href: "/admin/blogs", icon: Newspaper },
  { label: "Video", href: "/admin/videos", icon: MonitorPlay },
  { label: "Poster", href: "/admin/posters", icon: Images },
];

export const Navigations = () => {
  const pathname = usePathname();
  //   console.log("/admin/categories" !== menuMap[0].href);
  return (
    <ul className="w-full flex flex-col gap-y-2">
      {menuMap.map((item) => (
        <li key={item.label}>
          <Link href={item.href}>
            <Button
              className={cn(
                "w-full hover:bg-gray-200 bg-transparent justify-start",
                pathname.includes(item.href) && "bg-gray-200 hover:bg-gray-300"
              )}
              variant={"ghost"}
            >
              <item.icon className="h-4 w-4 mr-2" />
              {item.label}
            </Button>
          </Link>
        </li>
      ))}
    </ul>
  );
};
