import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { format as formatDateFns } from "date-fns";
import { id as indonesia } from "date-fns/locale";
import { $Enums } from "@prisma/client";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatTanggal = (tanggal: string) => {
  return !isNaN(new Date(tanggal).getTime())
    ? formatDateFns(new Date(tanggal), "dd MMM yyyy", {
        locale: indonesia,
      }).toString()
    : "";
};

export const mapCabang = [
  {
    label: "kampus-pusat",
    kampus: "PMDG kampus pusat",
    slug: "gontor-1",
    value: $Enums.CabangRole.PUTRA1,
  },
  {
    label: "kampus-3",
    kampus: "PMDG kampus 3",
    slug: "gontor-3",
    value: $Enums.CabangRole.PUTRA3,
  },
  {
    label: "kampus-4",
    kampus: "PMDG kampus 4",
    slug: "gontor-4",
    value: $Enums.CabangRole.PUTRA4,
  },
  {
    label: "kampus-5",
    kampus: "PMDG kampus 5",
    slug: "gontor-5",
    value: $Enums.CabangRole.PUTRA5,
  },
  {
    label: "kampus-6",
    kampus: "PMDG kampus 6",
    slug: "gontor-6",
    value: $Enums.CabangRole.PUTRA6,
  },
  {
    label: "kampus-7",
    kampus: "PMDG kampus 7",
    slug: "gontor-7",
    value: $Enums.CabangRole.PUTRA7,
  },
  {
    label: "kampus-putri-1",
    kampus: "PMDG kampus putri 1",
    slug: "gontor-putri-1",
    value: $Enums.CabangRole.PUTRI1,
  },
  {
    label: "kampus-putri-3",
    kampus: "PMDG kampus putri 3",
    slug: "gontor-putri-3",
    value: $Enums.CabangRole.PUTRI3,
  },
  {
    label: "kampus-putri-4",
    kampus: "PMDG kampus putri 4",
    slug: "gontor-putri-4",
    value: $Enums.CabangRole.PUTRI4,
  },
  {
    label: "kampus-putri-7",
    kampus: "PMDG kampus putri 7",
    slug: "gontor-putri-7",
    value: $Enums.CabangRole.PUTRI7,
  },
];
