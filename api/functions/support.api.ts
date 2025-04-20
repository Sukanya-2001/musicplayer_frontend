import { CONTACT_US } from "@/hooks/allKeys";
import { SupportPayload } from "@/hooks/Schema/supportSchema";
import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../axiosInstance";
import { endpoints } from "../endpoints";
import toast from "react-hot-toast";

//support form

export const useUserSupportForm = () => {
  return useMutation({
    mutationKey: [CONTACT_US],
    mutationFn: async (payload: SupportPayload) => {
      const res = await axiosInstance.post<any>(endpoints.home.support, payload);

      return res?.data;
    },
    onError: (res) => {
      toast.error(res?.message ?? "");
    }
  });
};
