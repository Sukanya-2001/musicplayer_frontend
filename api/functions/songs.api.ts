import { ALL_SONGS, SONGS_BY_TYPE } from "@/hooks/allKeys";
import { useInfiniteQuery } from "@tanstack/react-query";
import axiosInstance from "../axiosInstance";
import { endpoints } from "../endpoints";

export const useGetRecomendedSongsHook = () => {
  return useInfiniteQuery({
    queryKey: [ALL_SONGS],
    queryFn: async ({ pageParam = 1 }) => {
      const res = await axiosInstance.get<RecomendedResponseRoot>(
        `${endpoints.songs.allSongs}?page=${pageParam}&limit=6`
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

export const useGetSongsHook = (type: "the2000ssongs" | "90s" | "nrs") => {
  return useInfiniteQuery({
    queryKey: [SONGS_BY_TYPE, type],
    queryFn: async ({ pageParam = 1 }) => {
      const res = await axiosInstance.get<SongsResponseRoot>(
        `${endpoints.songs.songsByType}/${type}?page=${pageParam}&limit=3`
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

export interface RecomendedResponseRoot {
  songs: ISongsRes[];
  totalPage: number;
  totalArtist: number;
  limit: number;
  page: number;
}

export interface SongsResponseRoot {
  data: ISongsRes[];
  totalPage: number;
  totalReleaseSongs: number;
  limit: number;
  page: number;
}

export interface ISongsRes {
  _id: string;
  title: string;
  subtitle: string;
  publishYear: string;
  imageFile: string;
  audioFile: string;
  language: string;
  selectArtist: {
    title: string;
  }[];
}
