"use client";

import { fetcher } from "@/utils/fetcher";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import useSWR from "swr";
import { Loader2 } from "lucide-react";
import { useSession } from "next-auth/react";
import { getGrade } from "@/utils";

export default function ResultPage() {
  const session: any = useSession();

  // Panggil useSWR di luar kondisi apapun
  const token: any = session.data?.token;
  const fetchWithToken = (url: string) => {
    return fetcher(url, token);
  };
  const { data, error, isLoading } = useSWR(token ? `/api/farm` : null, fetchWithToken);

  data?.data?.map((item: any) => {
    // Mengkonversi item.ph ke angka jika tidak null atau undefined, atau memberikan nilai default (misalnya 0)
    const phValue = parseFloat(item.ph);
    item["grade"] = getGrade(phValue);
    item["ph"] = !isNaN(phValue) ? phValue.toFixed(2) : "N/A"; // Atau bisa menggunakan nilai default lain
  });
  

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
