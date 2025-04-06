import { next, setPlaylist } from "@/reduxtoolkit/slices/playerSlice";
import { RootState } from "@/reduxtoolkit/store/store";
import { useDispatch, useSelector } from "react-redux";
import { generatePlaylistWithMeta } from "./commonUtils";
import { useSongApiByType } from "./useSongApiByType";

export const useAutoNextAudio = () => {
  const dispatch = useDispatch();
  const { activeSongSource, currentIndex, playlist } = useSelector(
    (state: RootState) => state.audio
  );

  const { fetchNextPage, hasNextPage, isFetchingNextPage, data } =
    useSongApiByType(activeSongSource);

  const onSongEnd = async () => {
    const isLastSong = currentIndex === playlist.length - 1;
    console.log(isLastSong, "isLastSong");

    if (isLastSong && hasNextPage && !isFetchingNextPage) {
      const res = await fetchNextPage();

      const newSongs = res?.data?.pages?.flatMap((page) => {
        if ("songs" in page) {
          return page?.songs;
        } else if ("data" in page) {
          return page?.data;
        } else if ("filteredSongs" in page) {
          return page?.filteredSongs;
        } else {
          return [];
        }
      });
      const playList = await generatePlaylistWithMeta(newSongs!);

      if (!!playList && playList.length > 0) {
        dispatch(setPlaylist(playList));
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
