import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col gap-10 min-h-screen items-center justify-center">
      <h1 className="text-3xl font-bold">Selamat Datang di Silasilo</h1>
      <Button variant="secondary" className="text-white px-5">
        <Link href="/auth/login">Login</Link>
      </Button>
    </main>
  );
}
