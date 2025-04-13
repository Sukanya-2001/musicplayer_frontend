import { ALL_FAVOURITE_SONGS, MAKE_FAVOURITE } from "@/hooks/allKeys";
import { useInfiniteQuery, useMutation } from "@tanstack/react-query";
import axiosInstance from "../axiosInstance";
import { endpoints } from "../endpoints";
import { RecomendedResponseRoot } from "./songs.api";

export const useMakeFavourite = () => {
  return useMutation({
    mutationKey: [MAKE_FAVOURITE],
    mutationFn: async (songId: string) => {
      const res = await axiosInstance.get(
        `${endpoints.favoutite.makeFavourite}/${songId}`
      );
      return res?.data;
    }
  });
};

export const useGetFavoriteSongsHook = () => {
  return useInfiniteQuery({
    queryKey: [ALL_FAVOURITE_SONGS],
    queryFn: async ({ pageParam = 1 }) => {
      const res = await axiosInstance.get<RecomendedResponseRoot>(
        `${endpoints.favoutite.getAllFavourite}?page=${pageParam}&limit=3`
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
