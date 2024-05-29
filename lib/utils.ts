import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { format as formatDateFns } from "date-fns";
import { id as indonesia } from "date-fns/locale";

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
    value: "PUTRA1",
  },
  {
    label: "gontor-3",
    value: "PUTRA3",
  },
  {
    label: "gontor-4",
    value: "PUTRA4",
  },
  {
    label: "gontor-5",
    value: "PUTRA5",
  },
  {
    label: "gontor-6",
    value: "PUTRA6",
  },
  {
    label: "gontor-7",
    value: "PUTRA7",
  },
  {
    label: "gontor-putri-1",
    value: "PUTRI1",
  },
  {
    label: "gontor-putri-3",
    value: "PUTRI3",
  },
  {
    label: "gontor-putri-4",
    value: "PUTRI4",
  },
  {
    label: "gontor-putri-7",
    value: "PUTRI7",
  },
];
