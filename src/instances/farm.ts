import instance from "@/lib/axios/instance";

const farmInstance = {
  add: (data: any, token: string) =>
    instance.post(`/api/farm`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
};

export default farmInstance;
