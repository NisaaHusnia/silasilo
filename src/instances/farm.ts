import instance from "@/lib/axios/instance";

const farmInstance = {
  add: (data: any, token: string, id: string) =>
    instance.post(`/api/farm/${id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
};

export default farmInstance;
