import { UPLOAD_SONG } from "@/hooks/allKeys";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import axiosInstance from "../axiosInstance";
import { endpoints } from "../endpoints";

export const useUploadSong = () => {
  const router = useRouter();
  return useMutation({
    mutationKey: [UPLOAD_SONG],
    mutationFn: async (payload: FormData) => {
      const res = await axiosInstance.post<any>(
        endpoints.userManage.addSong,
        payload
      );
      return res;
    },
    onError: (res) => {
      if (res?.message === "Network Error") {
        const currentUrl =
          typeof window !== "undefined" ? window.location.href : "";
        toast.error("Please sign-in to upload a song.");
        router.push(`/auth/sign-in?redirect=${currentUrl}`);
      }
    }
  });
};
