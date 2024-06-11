"use client";

import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import authInstance from "@/instances/auth";
import { errorAlert, successAlert } from "@/utils/sweetalert2";
import { Input } from "@/components/ui/input";
import AuthLayout from "@/components/layouts/Auth";

const formSchema = z.object({
  name: z.string({ required_error: "Name harus di isi" }),
  email: z.string({ required_error: "Email harus di isi" }).email(),
  username: z.string({ required_error: "Username harus di isi" }),
  address: z.string({ required_error: "Alamat harus di isi" }),
  phone_number: z.string({ required_error: "Nomor telepon harus di isi" }),
  farm_name: z.string({ required_error: "Nama peternakan harus di isi" }),
  password: z.string({ required_error: "Password harus di isi" }),
});

const LoginForm = () => {
  const { push } = useRouter();
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      username: "",
      address: "",
      phone_number: "",
      farm_name: "",
      password: "",
    },
  });

  const handleSubmit = async (data: z.infer<typeof formSchema>) => {
    setLoading(true);
    try {
      const response = await authInstance.register(data);
      successAlert(response.data.message);
      push("/auth/login");
    } catch {
      errorAlert("Internal Server Error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout title="Daftar" link="/auth/login" linkText="Sudah punya akun?">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="max-w-md w-full flex flex-col bg-accent rounded-lg p-4 gap-1">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Nama</FormLabel>
                  <FormControl>
                    <Input placeholder="Nama" type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="contoh@gmail.com" type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="John" type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Alamat</FormLabel>
                  <FormControl>
                    <Input placeholder="Kediri" type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <FormField
            control={form.control}
            name="phone_number"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Nomor telepon</FormLabel>
                  <FormControl>
                    <Input placeholder="08xxxxxxxxxx" type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <FormField
            control={form.control}
            name="farm_name"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Nama peternakan</FormLabel>
                  <FormControl>
                    <Input placeholder="Peternakan" type="text" {...field} />
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
            <Button variant="secondary" type="submit" className="mt-3 text-white">
              Daftar
            </Button>
          )}
        </form>
      </Form>
    </AuthLayout>
  );
};

export default LoginForm;
