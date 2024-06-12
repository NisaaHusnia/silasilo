"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { TbLogout, TbLayoutDashboardFilled } from "react-icons/tb";
import { signOut } from "next-auth/react";
import { confirmAlert } from "@/utils/sweetalert2";
import { FaPlus } from "react-icons/fa";
import { FaNoteSticky } from "react-icons/fa6";
import Image from "next/image";
import { GiHamburgerMenu } from "react-icons/gi";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const links = [
  { name: "Dashboard", path: "dashboard", icon: <TbLayoutDashboardFilled className="text-lg text-white" /> },
  { name: "Tambah Proses", path: "process", icon: <FaPlus className="text-lg text-white" /> },
  { name: "Hasil", path: "result", icon: <FaNoteSticky className="text-lg text-white" /> },
];

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);

  const pathname = usePathname().split("/")[1];

  const handleSignOut = async () => {
    const confirmed = await confirmAlert("Apakah anda yakin ingin keluar?");
    if (confirmed) signOut();
  };

  return (
    <section className="flex flex-col">
      <aside className={`fixed ${isOpen ? "w-full z-10 bg-primary" : "w-12"} sm:w-48 h-screen flex flex-col items-center justify-center gap-8 p-2 bg-white`}>
        <div className="flex flex-col justify-between w-full h-screen pb-8 sm:pt-4">
          <div className="flex flex-col gap-4">
            <div className="flex sm:hidden justify-end">
              <GiHamburgerMenu className="text-3xl cursor-pointer" onClick={() => setIsOpen(!isOpen)} />
            </div>
            <div className="flex justify-center">
              <Image src="/images/logo.jpg" width={100} height={100} alt="logo" className="rounded-full mb-4" />
            </div>
            {links.map((link) => {
              return (
                <Link key={link.name} href={`/${link.path}`} onClick={() => setIsOpen(false)}>
                  <Button className={`${pathname === link.path ? "bg-tertiary" : "bg-secondary"} hover:bg-tertiary w-full cursor-pointer p-1`}>
                    {link.icon}
                    <p className={`ml-2 font-semibold ${isOpen ? "flex" : "hidden"} sm:flex`}>{link.name}</p>
                  </Button>
                </Link>
              );
            })}
          </div>
          <Button variant="destructive" onClick={handleSignOut}>
            <span>
              <TbLogout className="text-lg" />
            </span>
            <p className={`ml-2 font-semibold ${isOpen ? "flex" : "hidden"} sm:flex`}>Keluar</p>
          </Button>
        </div>
      </aside>
      <main className="overflow-hidden">
        <div className={`${isOpen ? "w-[calc(0vw)]" : "w-[calc(100vw-3rem)]"}  sm:w-[calc(100vw-12rem)] relative ${isOpen ? "left-0" : "left-12"} sm:left-48 bg-white min-h-screen p-4 bg-primary`}>{children}</div>
      </main>
    </section>
  );
};

export default DashboardLayout;
