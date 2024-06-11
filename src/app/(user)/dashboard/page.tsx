"use client";

import { Button } from "@/components/ui/button";
import DashboardView from "@/components/views/Dashboard";
import { fetcher } from "@/utils/fetcher";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import useSWR from "swr";
import { FaPlus } from "react-icons/fa";
import { useSession } from "next-auth/react";

const DashboardPage = () => {
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
  
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  if (!isLoading) {
    if (data?.data?.length === 0) {
      return (
        <div className="flex flex-col justify-center items-center h-screen">
          <h1 className="text-3xl font-bold">
            Data proses belum ada! <span className="text-primary">Tambahkan dulu</span>
          </h1>
          <Button variant="outline" className="mt-4">
            <FaPlus className="mr-2" />
            <Link href="/process">Tambah proses</Link>
          </Button>
        </div>
      );
    } else {
      return <DashboardView data={data?.data} />;
    }
  }
};

export default DashboardPage;
