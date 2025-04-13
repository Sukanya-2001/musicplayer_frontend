import {
  ALL_FAV_IDS,
  ALL_FAVOURITE_SONGS,
  MAKE_FAVOURITE
} from "@/hooks/allKeys";
import { useInfiniteQuery, useMutation } from "@tanstack/react-query";
import axiosInstance from "../axiosInstance";
import { endpoints } from "../endpoints";

export const useGetAllIds = () => {
  return useMutation({
    mutationKey: [ALL_FAV_IDS],
    mutationFn: async () => {
      const res = await axiosInstance.get<IFavIdsRes>(
        endpoints.favoutite.getAllFavoriteIds
      );
      return res?.data;
    }
  });
};

export const useMakeFavourite = () => {
  return useMutation({
    mutationKey: [MAKE_FAVOURITE],
    mutationFn: async (payload: FavPayload) => {
      const res = await axiosInstance.post(
        endpoints.favoutite.makeFavourite,
        payload
      );
      return res?.data;
    }
  });
};

export const useGetFavoriteSongsHook = (id: string) => {
  return useInfiniteQuery({
    queryKey: [ALL_FAVOURITE_SONGS, id],
    queryFn: async ({ pageParam = 1 }) => {
      const res = await axiosInstance.get<FavouriteResponseRoot>(
        `${endpoints.favoutite.getAllFavourite}/${id}?page=${pageParam}&limit=3`
      );

      return res?.data;
    },
    refetchOnMount: true,
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const nextPage = lastPage.page + 1;
      return nextPage <= lastPage.totalPage ? nextPage : undefined;
    }
  });
};

export interface IArtist {
  _id: string;
  title: string;
  description: string;
  file: string;
  status: "active" | "inactive";
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface ISong {
  _id: string;
  title: string;
  subtitle: string;
  publishYear: number;
  imageFile: string;
  audioFile: string;
  selectArtist: string[]; // array of artist IDs
  selectAlbum: string; // album ID
  songType: string[];
  language: string;
  status: "active" | "inactive";
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface IWishListItem {
  song: ISong;
  artist: IArtist[];
}

export interface FavouriteResponseRoot {
  wishList: IWishListItem[];
  totalPage: number;
  totalArtist: number;
  limit: number;
  page: number;
}

export interface FavPayload {
  song_id: string;
  artist_id: string[];
  album_id: string;
}

export type WishListItem = {
  _id: string;
  song: string;
};
export interface IFavIdsRes {
  wishListIds: WishListItem[];
  status: number;
}
