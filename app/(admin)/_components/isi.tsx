"use client";

import React, { Dispatch, SetStateAction } from "react";
import {
  BadgeDollarSign,
  Crown,
  Home,
  ImageIcon,
  Images,
  Layers3,
  MonitorPlay,
  Newspaper,
  SwatchBook,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

const menuMapAdmin = [
  { label: "Beranda", href: "/admin/dashboard", icon: Home },
  { label: "Category", href: "/admin/categories", icon: Layers3 },
  { label: "Blog", href: "/admin/blogs", icon: Newspaper },
  { label: "Video", href: "/admin/videos", icon: MonitorPlay },
  { label: "Photo", href: "/admin/photos", icon: ImageIcon },
  { label: "Poster", href: "/admin/posters", icon: Images },
  { label: "Roundown", href: "/admin/roundowns", icon: SwatchBook },
  { label: "Supervisors", href: "/admin/supervisors", icon: Crown },
  {
    label: "Sponsorship",
    href: "/admin/sponsorships",
    icon: BadgeDollarSign,
  },
];
const menuMapCabang = [
  { label: "Beranda", href: "/admin/dashboard", icon: Home },
  { label: "Blog", href: "/admin/blogs", icon: Newspaper },
  { label: "Video", href: "/admin/videos", icon: MonitorPlay },
  { label: "Photo", href: "/admin/photos", icon: ImageIcon },
  { label: "Poster", href: "/admin/posters", icon: Images },
  { label: "Roundown", href: "/admin/roundowns", icon: SwatchBook },
  { label: "Supervisors", href: "/admin/supervisors", icon: Crown },
  {
    label: "Sponsorship",
    href: "/admin/sponsorships",
    icon: BadgeDollarSign,
  },
];

export const Isi = ({
  isAdmin,
  onSelect,
}: {
  isAdmin: boolean;
  onSelect?: Dispatch<SetStateAction<boolean>>;
}) => {
  const pathname = usePathname();
  return (
    <ul className="w-full flex flex-col gap-y-2">
      {isAdmin
        ? menuMapAdmin.map((item) => (
            <li key={item.label}>
              <Link href={item.href}>
                <Button
                  className={cn(
                    "w-full hover:bg-gray-200 bg-transparent justify-start",
                    pathname.includes(item.href) &&
                      "bg-gray-200 hover:bg-gray-300"
                  )}
                  variant={"ghost"}
                  onClick={() => onSelect && onSelect(false)}
                >
                  <item.icon className="h-4 w-4 mr-2" />
                  {item.label}
                </Button>
              </Link>
            </li>
          ))
        : menuMapCabang.map((item) => (
            <li key={item.label}>
              <Link href={item.href}>
                <Button
                  className={cn(
                    "w-full hover:bg-gray-200 bg-transparent justify-start",
                    pathname.includes(item.href) &&
                      "bg-gray-200 hover:bg-gray-300"
                  )}
                  variant={"ghost"}
                  onClick={() => onSelect && onSelect(false)}
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
