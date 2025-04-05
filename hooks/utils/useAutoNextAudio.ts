import { useDispatch, useSelector } from "react-redux";
import { useGetRecomendedSongsHook } from "@/api/functions/songs.api";
import { RootState } from "@/reduxtoolkit/store/store";
import { next, setPlaylist } from "@/reduxtoolkit/slices/playerSlice";

export const useAutoNextAudio = () => {
  const dispatch = useDispatch();
  const { currentIndex, playlist } = useSelector((state: RootState) => state.audio);

  const {
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage
  } = useGetRecomendedSongsHook();

  const onSongEnd = async () => {
    const isLastSong = currentIndex === playlist.length - 1;
    console.log(isLastSong,"isLastSong");
    

    if (isLastSong && hasNextPage && !isFetchingNextPage) {
      const newData = await fetchNextPage();

      const newSongs = newData?.data?.pages?.flatMap((p: any) => p?.songs || []) || [];
      const newSrcs = newSongs.map((song: any) => song?.audioFile).filter(Boolean);

      if (!!newSrcs && newSrcs.length > 0) {
        const updatedPlaylist = [...playlist, ...newSrcs];//song1,  song1, song2
        dispatch(setPlaylist(newSrcs));
        dispatch(next());
        return;
      }
    }

    dispatch(next()); // Normal next if not last or no new data
  };

  return {
    onSongEnd
  };
};
