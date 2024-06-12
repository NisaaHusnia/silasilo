import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const DashboardView = ({ data }: any) => {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-3xl font-bold">Daftar proses</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {data?.map((item: any) => (
          <Card className="shadow-lg" key={item.id}>
            <CardHeader>
              <CardTitle>{item.farm_name}</CardTitle>
            </CardHeader>
            <CardContent>
              <Item>Lokasi : {item.location}</Item>
              <Item>Tanggal pembuatan : {item.creation_date}</Item>
              <Item>Waktu pembuatan : {item.creation_time}</Item>
              <Item>Bahan baku : {item.materials}</Item>
              <Item>Suhu : {item.temperature}</Item>
              <Item>Nilai pH : {item.ph}</Item>
            </CardContent>
            <CardFooter>
              <Item>ID : {item.id}</Item>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default DashboardView;

const Item = ({ children }: { children: React.ReactNode }) => {
  return <div className="w-full border-b-2 pt-4 shadow">{children}</div>;
};
