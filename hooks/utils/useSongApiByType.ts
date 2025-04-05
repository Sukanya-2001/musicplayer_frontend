// hooks/useSongSourceApi.ts
import {
  useGetRecomendedSongsHook,
  useGetSongsHook
} from "@/api/functions/songs.api";

export const useSongApiByType = (source: string | null) => {
  switch (source) {
    case "recommended":
      return useGetRecomendedSongsHook();
    case "the2000ssongs":
      return useGetSongsHook("the2000ssongs");
    case "90s":
      return useGetSongsHook("90s");
    case "nrs":
      return useGetSongsHook("nrs");
    // case "topRated":
    //   return useGetTopRatedSongsHook();
    // Add more cases as needed...
    default:
      return {
        fetchNextPage: async () => null,
        hasNextPage: false,
        isFetchingNextPage: false,
        data: null
      };
  }
};
