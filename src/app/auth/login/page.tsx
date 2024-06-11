"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Loader2 } from "lucide-react";
import { signIn } from "next-auth/react";
import { errorAlert, successAlert } from "@/utils/sweetalert2";
import { Input } from "@/components/ui/input";
import AuthLayout from "@/components/layouts/Auth";

const formSchema = z.object({
  username: z.string({ required_error: "Username harus di isi" }),
  password: z.string({ required_error: "Password harus di isi" }),
});

const LoginForm = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const handleSubmit = async (data: z.infer<typeof formSchema>) => {
    setLoading(true);
    try {
      const res = await signIn("credentials", {
        redirect: false,
        username: data.username,
        password: data.password,
      });

      if (res?.ok) {
        successAlert("Login sukses");
        router.push("/dashboard");
      } else {
        errorAlert("Username atau password salah");
      }
    } catch {
      errorAlert("Internal Server Error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout title="Login" link="/auth/register" linkText="Belum punya akun?">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="max-w-md w-full flex flex-col gap-4 bg-accent rounded-lg p-4">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="john" type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input placeholder="Password" type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          {loading ? (
            <Button variant="secondary" disabled className="mt-3">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Please wait...
            </Button>
          ) : (
            <Button variant="secondary" type="submit" className="mt-3">
              Login
            </Button>
          )}
        </form>
      </Form>
    </AuthLayout>
  );
};

export default LoginForm;
