// useAudioPlayer.ts

import {
  next,
  pause,
  play,
  prev,
  setPlaylist
} from "@/reduxtoolkit/slices/playerSlice";
import { Howl } from "howler";
import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../redux/useAppSelector";
import { generatePlaylistWithMeta } from "./commonUtils";
import { useAutoNextAudio } from "./useAutoNextAudio";
import { useSongApiByType } from "./useSongApiByType";

export const useAudioPlayer = () => {
  const { activeSongSource, playlist, currentIndex, isPlaying } =
    useAppSelector((s) => s.audio);
  const dispatch = useDispatch();
  const { onSongEnd } = useAutoNextAudio();

  const { fetchNextPage, hasNextPage, isFetchingNextPage, data } =
    useSongApiByType(activeSongSource);

  const soundRef = useRef<Howl | null>(null);

  // ⬇️ Setup sound only when song (src) changes
  useEffect(() => {
    const currentSong = playlist[currentIndex];
    if (!currentSong) return;

    if (soundRef.current) {
      soundRef.current.stop();
      soundRef.current.unload(); // Clean up old Howl
    }

    soundRef.current = new Howl({
      src: [currentSong.src],
      html5: true,
      onend: () => onSongEnd()
    });

    if (isPlaying) {
      soundRef.current.play();
    }

    return () => {
      soundRef.current?.stop();
    };
  }, [currentIndex]);

  const handlePlayPause = () => {
    if (!soundRef.current) return;

    if (isPlaying) {
      soundRef.current.pause();
      dispatch(pause());
    } else {
      soundRef.current.play(); // Will resume from current time
      dispatch(play());
    }
  };

  const handleNext = async () => {
    if (currentIndex < playlist.length - 1) {
      dispatch(next());
    } else if (hasNextPage && !isFetchingNextPage) {
      const res = await fetchNextPage();

      const newSongs = res?.data?.pages?.flatMap((page) => {
        if ("songs" in page) return page?.songs;
        if ("data" in page) return page?.data;
        if ("filteredSongs" in page) return page?.filteredSongs;
        return [];
      });

      const playList = await generatePlaylistWithMeta(newSongs!);
      if (playList?.length) {
        dispatch(setPlaylist(playList));
        dispatch(next());
      }
    }
  };

  const handlePrev = () => {
    dispatch(prev());
  };

  const skipForward = () => {
    if (soundRef.current) {
      const current = soundRef.current.seek() as number;
      soundRef.current.seek(current + 10);
    }
  };

  const skipBackward = () => {
    if (soundRef.current) {
      const current = soundRef.current.seek() as number;
      soundRef.current.seek(Math.max(0, current - 10));
    }
  };

  return {
    isPlaying,
    handlePlayPause,
    handleNext,
    handlePrev,
    skipForward,
    skipBackward,
    currentSong: playlist[currentIndex]
  };
};
