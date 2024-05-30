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
    label: "gontor-1",
    value: $Enums.CabangRole.PUTRA1,
  },
  {
    label: "gontor-3",
    value: $Enums.CabangRole.PUTRA3,
  },
  {
    label: "gontor-4",
    value: $Enums.CabangRole.PUTRA4,
  },
  {
    label: "gontor-5",
    value: $Enums.CabangRole.PUTRA5,
  },
  {
    label: "gontor-6",
    value: $Enums.CabangRole.PUTRA6,
  },
  {
    label: "gontor-7",
    value: $Enums.CabangRole.PUTRA7,
  },
  {
    label: "gontor-putri-1",
    value: $Enums.CabangRole.PUTRI1,
  },
  {
    label: "gontor-putri-3",
    value: $Enums.CabangRole.PUTRI3,
  },
  {
    label: "gontor-putri-4",
    value: $Enums.CabangRole.PUTRI4,
  },
  {
    label: "gontor-putri-7",
    value: $Enums.CabangRole.PUTRI7,
  },
];
