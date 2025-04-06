import { ALBUM_INFO, ALL_ALBUM, SONGS_BY_ALBUM } from "@/hooks/allKeys";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import axiosInstance from "../axiosInstance";
import { endpoints } from "../endpoints";
import { ISongsRes } from "./songs.api";

export const useGetSongsByAlbum = (id: string) => {
  return useInfiniteQuery({
    queryKey: [SONGS_BY_ALBUM, id],
    queryFn: async ({ pageParam = 1 }) => {
      const res = await axiosInstance.get<GetAlbumSongRes>(
        `${endpoints.album.songsByAlbum}/${id}?page=${pageParam}&limit=3`
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

export const useGetAlbumHook = () => {
  return useInfiniteQuery({
    queryKey: [ALL_ALBUM],
    queryFn: async ({ pageParam = 1 }) => {
      const res = await axiosInstance.get<GetAlbumRes>(
        `${endpoints.album.allAlbums}?page=${pageParam}&limit=8`
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

export const useGetAlbumInfoHook = (id: string) => {
  return useQuery({
    queryKey: [ALBUM_INFO, id],
    queryFn: async () => {
      const res = await axiosInstance.get<GetInfoRes>(
        `${endpoints.album.albumInfo}/${id}`
      );

      return res?.data?.album;
    },
    refetchOnMount: true
  });
};

export interface GetInfoRes {
  album: Album;
}

export interface Album {
  _id: string;
  title: string;
  description: string;
  file: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export interface GetAlbumRes {
  albums: Album[];
  totalPage: number;
  totalAlbum: number;
  page: number;
  limit: number;
  status: number;
}

export interface GetAlbumSongRes {
  filteredSongs: ISongsRes[];
  totalPage: number;
  totalSongs: number;
  page: number;
  limit: number;
  status: number;
}
