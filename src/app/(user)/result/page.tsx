"use client";

import { fetcher } from "@/utils/fetcher";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import useSWR from "swr";
import { Loader2 } from "lucide-react";
import { useSession } from "next-auth/react";

export default function ResultPage() {
  const session: any = useSession();

  // Panggil useSWR di luar kondisi apapun
  const id = session?.data?.user?.id;
  const { data, error, isLoading } = useSWR(id ? `/api/farm/${id}` : null, fetcher);

  if (session.status === "loading" || isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }
  
  return isLoading ? (
    <div className="flex justify-center items-center h-screen">
      <Loader2 className="w-8 h-8 animate-spin" />
    </div>
  ) : (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold mb-4">Hasil Proses</h1>
      <DataTable columns={columns} data={data?.data} />
    </div>
  );
}
