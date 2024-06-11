"use client";

import Navbar from "@/components/fragments/Navbar";
import { Loader2 } from "lucide-react";
import { useSession } from "next-auth/react";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const session = useSession();

  if (session.status === "loading") {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  const data: any = session.data?.user;

  return (
    <section className="flex flex-col">
      <aside className="fixed w-12 sm:w-48 h-screen flex flex-col items-center justify-center sm:justify-normal gap-8 p-2 bg-white">
        <Navbar />
      </aside>
      <main className="overflow-hidden">
        <div className="w-[calc(100vw-3rem)] sm:w-[calc(100vw-12rem)] relative left-12 sm:left-48 bg-white min-h-screen p-4 bg-primary">{children}</div>
      </main>
    </section>
  );
};

export default DashboardLayout;
