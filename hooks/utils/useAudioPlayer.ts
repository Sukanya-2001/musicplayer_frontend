// useAudioPlayer.ts

import {
  next,
  pause,
  play,
  prev,
  setPlaylist
} from "@/reduxtoolkit/slices/playerSlice";
import { Howl } from "howler";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../redux/useAppSelector";
import { generatePlaylistWithMeta } from "./commonUtils";
import { useAutoNextAudio } from "./useAutoNextAudio";
import { useSongApiByType } from "./useSongApiByType";

export const useAudioPlayer = () => {
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
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

  //for progreebar and time
  useEffect(() => {
    const interval = setInterval(() => {
      const sound = soundRef.current;
      if (sound && sound.playing()) {
        const current = sound.seek() as number;
        const total = sound.duration();
        if (total > 0) {
          setCurrentTime(current);
          setDuration(total);
          setProgress((current / total) * 100);
        }
      }
    }, 500);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

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
      const sound = soundRef.current;
      const total = sound.duration();
      const current = soundRef.current.seek() as number;
      const newTime = Math.min(soundRef.current.duration(), current + 10);
      soundRef.current.seek(newTime);
      setCurrentTime(newTime); // 🔥 Update state immediately
      setProgress((newTime / total) * 100);
    }
  };

  const skipBackward = () => {
    if (soundRef.current) {
      const sound = soundRef.current;
      const total = sound.duration();
      const current = soundRef.current.seek() as number;
      const newTime = Math.max(0, current - 10);
      soundRef.current.seek(newTime);
      setCurrentTime(newTime); // 🔥 Update state immediately
      setProgress((newTime / total) * 100);
    }
  };

  return {
    isPlaying,
    handlePlayPause,
    handleNext,
    handlePrev,
    skipForward,
    skipBackward,
    currentSong: playlist[currentIndex],
    progress,
    currentTimeFormatted: formatTime(currentTime),
    durationFormatted: formatTime(duration)
  };
};
