// hooks/useSongSourceApi.ts
import { useGetSongsByAlbum } from "@/api/functions/album.api";
import { useGetSongsByArtist } from "@/api/functions/artist.api";
import { useGetSongByGenreHook } from "@/api/functions/discover.api";
import {
  useGetRecomendedSongsHook,
  useGetSongsHook
} from "@/api/functions/songs.api";

export const useSongApiByType = (source: string | null) => {
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

  // Default fallback
  return {
    fetchNextPage: async () => null,
    hasNextPage: false,
    isFetchingNextPage: false,
    data: null
  };
};
