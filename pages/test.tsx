import { useAudioPlayer } from "@/hooks/utils/useAudioPlayer";
import React from "react";

const playlist = [
  { src: "https://commondatastorage.googleapis.com/codeskulptor-demos/DDR_assets/Kangaroo_MusiQue_-_The_Neverwritten_Role_Playing_Game.mp3", title: "Song 1" },
  { src: "https://commondatastorage.googleapis.com/codeskulptor-assets/Epoq-Lepidoptera.ogg", title: "Song 2" },
];

const Test = () => {
  const {
    isPlaying,
    handlePlayPause,
    handleNext,
    handlePrev,
    skipForward,
    skipBackward,
    currentSong,
  } = useAudioPlayer(playlist);

  return (
    <div className="p-4 border rounded-lg">
      <h2>{currentSong.title}</h2>
      <button onClick={handlePrev}>⏮️ Prev</button>
      <button onClick={skipBackward}>⏪ -10s</button>
      <button onClick={handlePlayPause}>{isPlaying ? "⏸️ Pause" : "▶️ Play"}</button>
      <button onClick={skipForward}>⏩ +10s</button>
      <button onClick={handleNext}>⏭️ Next</button>
    </div>
  );
};

export default Test;
