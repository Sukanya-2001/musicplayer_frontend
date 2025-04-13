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
import { useSongApiByType } from "./useSongApiByType";

export const useAudioPlayer = () => {
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [noMoreSongs, setNoMoreSongs] = useState(false);

  const { activeSongSource, playlist, currentIndex, isPlaying } =
    useAppSelector((s) => s.audio);
  const dispatch = useDispatch();
  const { fetchNextPage, hasNextPage, isFetchingNextPage, data } =
    useSongApiByType(activeSongSource);

  const soundRef = useRef<Howl | null>(null);

  const currentSong = playlist[currentIndex];
  const isFirstSong = currentIndex <= 0;
  const isLastSong = currentIndex === playlist.length - 1 && noMoreSongs;

  // Setup sound when current song changes
  useEffect(() => {
    if (!currentSong) return;

    if (soundRef.current) {
      soundRef.current.stop();
      soundRef.current.unload();
    }

    soundRef.current = new Howl({
      src: [currentSong.src],
      html5: true,
      onend: () => {
        if (isLastSong) {
          dispatch(pause()); // auto-pause at end of playlist
        } else {
          handleNext(); // auto-play next song
        }
      }
    });

    if (isPlaying) {
      soundRef.current.play();
    }

    return () => {
      soundRef.current?.stop();
    };
  }, [currentIndex]);

  // Track progress
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
      soundRef.current.play();
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
        setNoMoreSongs(false); // More songs found
      } else {
        setNoMoreSongs(true); // ✅ No more songs
      }
    } else {
      setNoMoreSongs(true); // ✅ No more pages
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      dispatch(prev());
    }
  };

  const skipForward = () => {
    if (soundRef.current) {
      const total = soundRef.current.duration();
      const current = soundRef.current.seek() as number;
      const newTime = Math.min(total, current + 10);
      soundRef.current.seek(newTime);
      setCurrentTime(newTime);
      setProgress((newTime / total) * 100);
    }
  };

  const skipBackward = () => {
    if (soundRef.current) {
      const total = soundRef.current.duration();
      const current = soundRef.current.seek() as number;
      const newTime = Math.max(0, current - 10);
      soundRef.current.seek(newTime);
      setCurrentTime(newTime);
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
    currentSong,
    progress,
    currentTimeFormatted: formatTime(currentTime),
    durationFormatted: formatTime(duration),
    isFirstSong,
    isLastSong
  };
};
