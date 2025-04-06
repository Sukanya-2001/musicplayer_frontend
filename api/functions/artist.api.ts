import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import axiosInstance from "../axiosInstance";
import { endpoints } from "../endpoints";
import { ALL_ARTIST, ARTIST_INFO, SONGS_BY_ARTIST } from "@/hooks/allKeys";
import { ISongsRes } from "./songs.api";

export const useGetSongsByArtist = (id: string) => {
  return useInfiniteQuery({
    queryKey: [SONGS_BY_ARTIST, id],
    queryFn: async ({ pageParam = 1 }) => {
      const res = await axiosInstance.get<GetArtistSongRes>(
        `${endpoints.artist.songsByArtist}/${id}?page=${pageParam}&limit=3`
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

export const useGetArtistInfoHook = (id: string) => {
  return useQuery({
    queryKey: [ARTIST_INFO, id],
    queryFn: async () => {
      const res = await axiosInstance.get<GetInfoRes>(
        `${endpoints.artist.artistInfo}/${id}`
      );

      return res?.data?.artist;
    }
  });
};

export const useGetAllArtistHook = () => {
  return useInfiniteQuery({
    queryKey: [ALL_ARTIST],
    queryFn: async ({ pageParam = 1 }) => {
      const res = await axiosInstance.get<GetArtistRes>(
        `${endpoints.artist.allArtists}?page=${pageParam}&limit=8`
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

export interface GetArtistSongRes {
  filteredSongs: ISongsRes[];
  totalPage: number;
  totalSongs: number;
  page: number;
  limit: number;
  status: number;
}

export interface GetArtistRes {
  artists: Artist[];
  totalPage: number;
  totalArtist: number;
  page: number;
  limit: number;
  status: number;
}

export interface GetInfoRes {
  artist: Artist;
}

export interface Artist {
  _id: string;
  title: string;
  description: string;
  file: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}
