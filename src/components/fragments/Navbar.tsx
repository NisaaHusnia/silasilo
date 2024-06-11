import Link from "next/link";
import { Button } from "../ui/button";
import { usePathname } from "next/navigation";
import { TbLogout, TbLayoutDashboardFilled } from "react-icons/tb";
import { signOut, useSession } from "next-auth/react";
import { Loader2 } from "lucide-react";
import { confirmAlert } from "@/utils/sweetalert2";
import { FaPlus } from "react-icons/fa";
import { FaNoteSticky } from "react-icons/fa6";
import Image from "next/image";

const links = [
  { name: "Dashboard", path: "dashboard", icon: <TbLayoutDashboardFilled className="text-lg text-white" /> },
  { name: "Tambah Proses", path: "process", icon: <FaPlus className="text-lg text-white" /> },
  { name: "Hasil", path: "result", icon: <FaNoteSticky className="text-lg text-white" /> },
];

const Navbar = () => {
  const { data: sessionData, status: sessionStatus } = useSession();
  const pathname = usePathname().split("/")[1];

  const handleSignOut = async () => {
    const confirmed = await confirmAlert("Apakah anda yakin ingin keluar?");
    if (confirmed) signOut();
  };

  if (sessionStatus === "loading") {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  const user = sessionData?.user;

  return (
    <div className="flex flex-col justify-between w-full h-screen py-4">
      <div className="flex flex-col gap-4">
        <div className="flex justify-center">
          <Image src="/images/logo.jpg" width={100} height={100} alt="logo" className="rounded-full mb-4" />
        </div>
        {links.map((link) => {
          return (
            <Link key={link.name} href={`/${link.path}`}>
              <Button className={`${pathname === link.path ? "bg-tertiary" : "bg-secondary"} hover:bg-tertiary w-full cursor-pointer p-1`}>
                {link.icon}
                <p className="ml-2 font-semibold hidden sm:flex">{link.name}</p>
              </Button>
            </Link>
          );
        })}
      </div>
      <Button variant="destructive" onClick={handleSignOut}>
        <TbLogout className="text-lg" />
        <p className="ml-2 font-semibold hidden sm:flex">Keluar</p>
      </Button>
    </div>
  );
};

export default Navbar;
