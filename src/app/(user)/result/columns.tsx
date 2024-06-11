"use client";

import { ColumnDef } from "@tanstack/react-table";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Farm = {
  id: string;
  farm_name: string;
  location: string;
  creation_date: string;
  creation_time: string;
  materials: string;
  temperature: string;
  ph_level: string;
  grade: string;
};

export const columns: ColumnDef<Farm>[] = [
  {
    accessorKey: "farm_name",
    header: "Nama Peternakan",
  },
  {
    accessorKey: "location",
    header: "Lokasi",
  },
  {
    accessorKey: "creation_date",
    header: "Tgl. Produksi",
  },
  {
    accessorKey: "creation_time",
    header: "Waktu Produksi",
  },
  {
    accessorKey: "materials",
    header: "Bahan Baku",
  },
  {
    accessorKey: "temperature",
    header: "Suhu",
  },
  {
    accessorKey: "ph_level",
    header: "Nilai pH",
  },
];
