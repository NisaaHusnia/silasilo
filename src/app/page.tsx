import Image from "next/image";
import Link from "next/link";
import logoImage from "../../public/images/silasilo.png";
import heroImage from "../../public/images/hero.png";

export default function Home() {
  return (
    <section className="min-h-screen flex flex-col w-full bg-gradient-to-b from-[#204224] via-[#82a15c] to-[#f9f8ba]">
      <header className="flex py-4 px-2 justify-between md:mr-10 lg:mr-28">
        <div className="flex gap-2 items-center">
          <Image src={logoImage} alt="Logo" width={50} height={50} />
          <h2 className="text-2xl md:text-3xl font-extrabold">SILATECH CONTROL</h2>
        </div>
        <div className="hidden md:flex gap-8 items-center">
          <Link href="/">
            <button className="text-3xl font-semibold text-black">HOME</button>
          </Link>
          <Link href="/auth/login">
            <button className="text-3xl font-semibold">LOGIN</button>
          </Link>
          <Link href="/auth/register">
            <button className="text-3xl font-semibold">REGISTER</button>
          </Link>
        </div>
      </header>
      <main className="flex justify-between px-6 mt-4 md:mt-10 gap-4 items-center">
        <div className="md:w-2/3 flex flex-col gap-3">
          <h4 className="text-lg font-bold">PILIHAN TERBAIK</h4>
          <h1 className="text-2xl md:text-4xl font-extrabold">PENGONTROL SILASE </h1>
          <div>
            <p className="font-bold text-justify">Selamat Datang Di Silatech Control,</p>
            <p className="font-bold text-justify md:w-4/5">solusi cerdas untuk mengontrol  aktivitas online Anda dengan mudah dan efektif. Dengan real-time, analisis data mendalam, dan antarmuka yang ramah pengguna.</p>
          </div>
          <div className="flex gap-4">
            <Link href="/auth/login">
              <button className="bg-secondary text-black rounded-3xl md:text-xl font-bold py-4 px-6">LOGIN</button>
            </Link>
            <Link href="/auth/register">
              <button className="bg-secondary text-black rounded-3xl md:text-xl font-bold py-4 px-6">REGISTER</button>
            </Link>
          </div>
        </div>
        <div className="hidden md:block w-1/3">
          <Image src={heroImage} alt="Logo" width={500} height={500} />
        </div>
      </main>
    </section>
  );
}
