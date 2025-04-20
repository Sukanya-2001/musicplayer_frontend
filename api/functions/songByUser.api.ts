import { ALL_USER, UPLOAD_SONG } from "@/hooks/allKeys";
import { useInfiniteQuery, useMutation } from "@tanstack/react-query";
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

export const useGetAllUserHook = () => {
  return useInfiniteQuery({
    queryKey: [ALL_USER],
    queryFn: async ({ pageParam = 1 }) => {
      const res = await axiosInstance.get<GetPeopleRes>(
        `${endpoints.userManage.allUser}?page=${pageParam}&limit=8`
      );

      return res?.data;
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const nextPage = lastPage.page + 1;
      return nextPage <= lastPage.totalPage ? nextPage : undefined;
    }
  });
};

export interface GetPeopleRes {
  exploreSongs: People[];
  totalPage: number;
  totalArtist: number;
  page: number;
  limit: number;
  status: number;
}

export interface People {
  _id: string;
  userId: {
    _id: string;
    name: string;
  };
  file: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}
