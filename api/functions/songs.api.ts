import { useInfiniteQuery } from "@tanstack/react-query";
import axiosInstance from "../axiosInstance";
import { endpoints } from "../endpoints";
import { SONGS_BY_TYPE } from "@/hooks/allKeys";

export const useGetSongsHook = (type: string) => {
    return useInfiniteQuery({
      queryKey: [SONGS_BY_TYPE, type],
      queryFn: async ({ pageParam = 1 }) => {
        const res = await axiosInstance.get(
          `${endpoints.songs.songsByType}?page=${pageParam}&limit=3&type=${type}`
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