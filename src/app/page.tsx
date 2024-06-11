import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { TiArrowRightOutline } from "react-icons/ti";

export default function Home() {
  return (
    <section className="min-h-screen flex flex-col justify-between py-14 sm:py-36 items-center w-full bg-gradient-to-br from-[#f6e7ae] to-[#897546]">
      <div className="flex gap-2">
        <Image src="/images/logo.jpg" alt="Logo" width={30} height={30} />
        <h2 className="text-2xl md:text-3xl font-semibold">Silasilo Monitor</h2>
      </div>
      <div className="flex flex-col justify-center w-full md:w-1/2 px-5 gap-2">
        <h1 className="text-2xl font-semibold">Kesuksesan dalam berternak datang dari ketekunan dan kerja keras setiap hari</h1>
        <p className="text-justify indent-10">
          Kesuksesan dalam berternak berasal dari ketekunan dan kerja keras setiap hari, di mana peternak dengan penuh dedikasi merawat ternak mereka, memperhatikan detail, dan terus belajar serta beradaptasi untuk mencapai hasil yang
          optimal.
        </p>
        <Button variant="outline" className="w-fit text-xl mt-10 flex">
          <Link href="/process">Login</Link>
          <TiArrowRightOutline className="ml-2" />
        </Button>
      </div>
    </section>
  );
}
