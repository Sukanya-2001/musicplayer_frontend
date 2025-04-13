import { ALL_DISCOVER_SONG, SONGS_BY_GENRE } from "@/hooks/allKeys";
import { useInfiniteQuery } from "@tanstack/react-query";
import axiosInstance from "../axiosInstance";
import { endpoints } from "../endpoints";
import { ISongsRes } from "./songs.api";

export const useGetDiscoverSongsHook = () => {
  return useInfiniteQuery({
    queryKey: [ALL_DISCOVER_SONG],
    queryFn: async ({ pageParam = 1 }) => {
      const res = await axiosInstance.get<SongDataResponseRoot>(
        `${endpoints.discover.allDetails}?page=${pageParam}&limit=6`
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

export const useGetSongByGenreHook = (type: string) => {
  return useInfiniteQuery({
    queryKey: [SONGS_BY_GENRE, type],
    queryFn: async ({ pageParam = 1 }) => {
      const res = await axiosInstance.get<DiscoverSongResponseRoot>(
        `${endpoints.discover.songsByGenre}/${type}?page=${pageParam}&limit=3`
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

export interface GenreSongs {
  genre: string;
  songs: ISongsRes[];
}

export interface SongDataResponseRoot {
  data: GenreSongs[];
  totalPage: number;
  totalArtist: number;
  limit: number;
  page: number;
}

export interface DiscoverSongResponseRoot {
  songs: ISongsRes[];
  totalPage: number;
  totalReleaseSongs: number;
  limit: number;
  page: number;
}
