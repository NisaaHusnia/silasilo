"use client";

import { Button } from "@/components/ui/button";
import DashboardView from "@/components/views/Dashboard";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { FaPlus } from "react-icons/fa";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import instance from "@/lib/axios/instance";
import { errorAlert } from "@/utils/sweetalert2";

const DashboardPage = () => {
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

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  if (!isLoading) {
    if (data.length > 0) {
      return <DashboardView data={data} />;
    } else {
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
    }
  }
};

export default DashboardPage;
