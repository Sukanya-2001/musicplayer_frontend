// components/PlayMusic.tsx
import { useAudioPlayer } from "@/hooks/utils/useAudioPlayer";
import { Box } from "@mui/material";

export const PlayMusic = () => {
  const {
    isPlaying,
    handlePlayPause,
    handleNext,
    handlePrev,
    skipForward,
    skipBackward,
    currentSong
  } = useAudioPlayer();

  if (!currentSong) return null;

  return (
    <Box className="p-4 border rounded-lg" sx={{display:"flex", justifyContent:"flex-end"}}>
      {/* <h2>{currentSong.title}</h2> */}
      <button onClick={handlePrev}>⏮️ Prev</button>
      <button onClick={skipBackward}>⏪ -10s</button>
      <button onClick={handlePlayPause}>
        {isPlaying ? "⏸️ Pause" : "▶️ Play"}
      </button>
      <button onClick={skipForward}>⏩ +10s</button>
      <button onClick={handleNext}>⏭️ Next</button>
    </Box>
  );
};
