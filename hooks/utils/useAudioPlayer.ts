import { useState, useEffect, useRef } from "react";
import { Howl } from "howler";

interface Song {
  src: string;
  title: string;
}

export const useAudioPlayer = (playlist: Song[]) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const soundRef = useRef<Howl | null>(null);

  useEffect(() => {
    if (soundRef.current) {
      soundRef.current.stop();
    }

    soundRef.current = new Howl({
      src: [playlist[currentIndex].src],
      html5: true,
      onend: () => handleNext(),
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
    } else {
      soundRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % playlist.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + playlist.length) % playlist.length);
  };

  const skipForward = () => {
    soundRef.current?.seek(soundRef.current.seek() + 10);
  };

  const skipBackward = () => {
    soundRef.current?.seek(Math.max(0, soundRef.current.seek() - 10));
  };

  return {
    isPlaying,
    handlePlayPause,
    handleNext,
    handlePrev,
    skipForward,
    skipBackward,
    currentSong: playlist[currentIndex],
  };
};
