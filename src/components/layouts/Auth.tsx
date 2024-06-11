import Link from "next/link";
import { Button } from "../ui/button";

const AuthLayout = ({ title, children, link, linkText }: any) => {
  return (
    <section className="bg-white p-4 min-h-screen flex justify-center items-center flex-col">
      <h1 className="text-3xl text-center font-bold mb-4">{title}</h1>
      {children}
      <p className="text-sm text-gray-600 mt-2">
        {linkText}
        <Button variant="link">
          <Link href={link} className="underline text-blue-500">
            klik disini
          </Link>
        </Button>
      </p>
    </section>
  );
};

export default AuthLayout;
