"use client";

import { columns } from "./columns";
import { DataTable } from "./data-table";
import { Loader2 } from "lucide-react";
import { useSession } from "next-auth/react";
import { getGrade } from "@/utils";
import { useEffect, useState } from "react";
import instance from "@/lib/axios/instance";
import { errorAlert } from "@/utils/sweetalert2";

export default function ResultPage() {
  const session: any = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<any>([]);

  const id = session?.data?.user?.id;

  useEffect(() => {
    setIsLoading(true);
    instance
      .get(`/api/farm/${id}`)
      .then((res) => {
        setData(res.data.data);
      })
      .catch((err) => {
        errorAlert("Internal Server Error");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  data.map((item: any) => {
    item["grade"] = getGrade(item.ph);
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
      <DataTable columns={columns} data={data} />
    </div>
  );
}
