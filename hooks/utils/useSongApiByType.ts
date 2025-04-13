// hooks/useSongSourceApi.ts
import { useGetSongsByAlbum } from "@/api/functions/album.api";
import { useGetSongsByArtist } from "@/api/functions/artist.api";
import { useGetSongByGenreHook } from "@/api/functions/discover.api";
import { useGetFavoriteSongsHook } from "@/api/functions/favourite.api";
import {
  useGetRecomendedSongsHook,
  useGetSongsHook
} from "@/api/functions/songs.api";

export const useSongApiByType = (source: string | null, userId: string) => {
  if (!source) {
    return {
      fetchNextPage: async () => null,
      hasNextPage: false,
      isFetchingNextPage: false,
      data: null
    };
  }

  if (source === "recommended") {
    return useGetRecomendedSongsHook();
  }

  if (source === "the2000ssongs" || source === "90s" || source === "nrs") {
    return useGetSongsHook(source);
  }

  if (source.startsWith("songByAlbum-")) {
    const albumId = source.split("songByAlbum-")[1];
    return useGetSongsByAlbum(albumId);
  }

  if (source.startsWith("songByArtist-")) {
    const artistId = source.split("songByArtist-")[1];
    return useGetSongsByArtist(artistId);
  }

  if (source.startsWith("genre-")) {
    const genre = source.split("genre-")[1];
    return useGetSongByGenreHook(genre);
  }

  if (source === "favourite") {
    return useGetFavoriteSongsHook(userId);
  }

  // Default fallback
  return {
    fetchNextPage: async () => null,
    hasNextPage: false,
    isFetchingNextPage: false,
    data: null
  };
};
