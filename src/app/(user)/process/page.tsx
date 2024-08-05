"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { errorAlert, successAlert } from "@/utils/sweetalert2";
import { Input } from "@/components/ui/input";
import farmInstance from "@/instances/farm";
import { useSession } from "next-auth/react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const formSchema = z.object({
  farm_name: z.string({ required_error: "Nama peternakan harus di isi" }),
  location: z.string({ required_error: "Lokasi harus di isi" }),
  creation_date: z.string({ required_error: "Tanggal pembuatan harus di isi" }),
  creation_time: z.string({ required_error: "Waktu pembuatan harus di isi" }),
  material: z.enum(["bongkil jagung", "rumput gajah"], { required_error: "Bahan baku harus di isi" }),
});

const ProcessPage = () => {
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      farm_name: "",
      location: "",
      creation_date: new Date().toISOString().slice(0, 10),
      creation_time: new Date().toLocaleTimeString([],{ hour: '2-digit', minute: '2-digit' }),
      material: "bongkil jagung",
    },
  });

  // ambil token
  const session: any = useSession();
  if (session.status === "loading") {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }
  const token: any = session.data?.token;

  const handleSubmit = async (data: z.infer<typeof formSchema>) => {
    setLoading(true);
    
    try {
      const response = await farmInstance.add(data, token);
      successAlert(response.data.message);
    } catch {
      errorAlert("Internal Server Error");
    } finally {
      setLoading(false);
      form.reset();
    }
  };

  return (
    <div className="flex flex-col gap-4 justify-center items-center min-h-screen">
      <h1 className="text-3xl font-bold">Tambah proses</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="max-w-md w-full flex flex-col bg-accent rounded-lg p-4 gap-1">
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
            name="location"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Lokasi</FormLabel>
                  <FormControl>
                    <Input placeholder="Jl. Kediri" type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <FormField
            control={form.control}
            name="creation_date"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Tanggal Pembuatan</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <FormField
            control={form.control}
            name="creation_time"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Waktu pembuatan</FormLabel>
                  <FormControl>
                    <Input type="time" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <FormField
            control={form.control}
            name="material"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>Bahan baku</FormLabel>
                <FormControl className="bg-[#f5f5f5] p-2 rounded">
                  <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex flex-col space-y-1">
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="bongkil jagung" />
                      </FormControl>
                      <FormLabel className="font-normal">Bongkil jagung</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="rumput gajah" />
                      </FormControl>
                      <FormLabel className="font-normal">Rumput gajah</FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
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
    </div>
  );
};

export default ProcessPage;
