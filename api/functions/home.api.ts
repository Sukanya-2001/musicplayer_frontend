import { HOME_PAGE_DETAILS } from "@/hooks/allKeys";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../axiosInstance";
import { endpoints } from "../endpoints";

export const useGetHomePageDetails = () => {
  return useQuery({
    queryKey: [HOME_PAGE_DETAILS],
    queryFn: async () => {
      const res = await axiosInstance.get<HomePageResponseRoot>(
        endpoints.home.getHomePageDetails
      );
      return res?.data;
    }
  });
};

export interface HomePageResponseRoot {
  Allsongs: ISongs[];
  newReleases: ISongs[];
  limitedArtists: LimitedArtist[];
  limitedAlbums: LimitedAlbum[];
  randomSongs: ISongs[];
  songslessthan90s: ISongs[];
  the2000ssongs: ISongs[];
  status: number;
}

export interface ISongs {
    _id: string;
    title: string;
    subtitle: string;
    imageFile: string;
}

export interface Allsong {
  _id: string;
  title: string;
  subtitle: string;
  publishYear: number;
  imageFile: string;
  audioFile: string;
  selectArtist: SelectArtist[];
  selectAlbum: SelectAlbum;
  songType: string[];
  language: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface SelectArtist {
  _id: string;
  title: string;
  description: string;
  file: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface SelectAlbum {
  _id: string;
  title: string;
  description: string;
  file: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface NewRelease {
  _id: string;
  title: string;
  subtitle: string;
  publishYear: number;
  imageFile: string;
  audioFile: string;
  selectArtist: string[];
  selectAlbum: string;
  songType: string[];
  language: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface LimitedArtist {
  _id: string;
  title: string;
  description: string;
  file: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface LimitedAlbum {
  _id: string;
  title: string;
  description: string;
  file: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface RandomSong {
  _id: string;
  title: string;
  subtitle: string;
  publishYear: number;
  imageFile: string;
  audioFile: string;
  selectArtist: string[];
  selectAlbum: string;
  songType: string[];
  language: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface The2000ssong {
  _id: string;
  title: string;
  subtitle: string;
  publishYear: number;
  imageFile: string;
  audioFile: string;
  selectArtist: string[];
  selectAlbum: string;
  songType: string[];
  language: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
