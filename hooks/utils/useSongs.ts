import { ISongsRes } from "@/api/functions/songs.api";
import {
  play,
  resetAll,
  setActiveSongSource,
  setCurrentIndex,
  setPlaylist
} from "@/reduxtoolkit/slices/playerSlice";
import { generatePlaylistWithMeta } from "./commonUtils";

export const usePlaySongs = async (
  index: number,
  songList: ISongsRes[],
  type: string,
  dispatch: any
) => {
  dispatch(resetAll());
  const playList = await generatePlaylistWithMeta(songList);
  dispatch(setPlaylist(playList));
  dispatch(setCurrentIndex(index));
  dispatch(setActiveSongSource(`${type}`));
  dispatch(play());
};
