// components/PlayMusic.tsx
import { useAudioPlayer } from "@/hooks/utils/useAudioPlayer";
import FastForwardIcon from "@mui/icons-material/FastForward";
import FastRewindIcon from "@mui/icons-material/FastRewind";
import PauseIcon from "@mui/icons-material/Pause";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import { Box, Grid, IconButton, Typography } from "@mui/material";
import Image from "next/image";

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
    
    // <Box className="p-4 border rounded-lg" sx={{display:"flex", justifyContent:"flex-end"}}>
    //   {/* <h2>{currentSong.title}</h2> */}
    //   <button onClick={handlePrev}>⏮️ Prev</button>
    //   <button onClick={skipBackward}>⏪ -10s</button>
    //   <button onClick={handlePlayPause}>
    //     {isPlaying ? "⏸️ Pause" : "▶️ Play"}
    //   </button>
    //   <button onClick={skipForward}>⏩ +10s</button>
    //   <button onClick={handleNext}>⏭️ Next</button>
    // </Box>
    <Box
      sx={{
        position: "fixed",
        bottom: 0,
        right: 0,

        width: { xs: "100vw", sm: "65vw", md: "50vw", lg: "30vw" },
        backgroundColor: "#1e1e1e",
        padding: "15px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        zIndex: 999
      }}
    >
      <Grid container alignItems="center">
        <Grid item xs={2}>
          <Image
            src={currentSong.image}
            alt={currentSong.title}
            width={60}
            height={60}
            style={{ borderRadius: "8px" }}
          />
        </Grid>

        <Grid item xs={8}>
          <Typography variant="body2" fontWeight="bold" color="white">
            {currentSong.title}
          </Typography>
          <Typography variant="body2" color="gray">
            {currentSong.artist}
          </Typography>
        </Grid>

        <Grid item xs={2} display="flex" justifyContent="flex-end">
          <IconButton color="primary" onClick={handlePrev}>
            <SkipPreviousIcon />
          </IconButton>
          <IconButton color="primary" onClick={skipBackward}>
            <FastRewindIcon />
          </IconButton>
          <IconButton color="primary" onClick={handlePlayPause}>
            {isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
          </IconButton>
          <IconButton color="primary" onClick={skipForward}>
            <FastForwardIcon />
          </IconButton>
          <IconButton color="primary" onClick={handleNext}>
            <SkipNextIcon />
          </IconButton>
        </Grid>

        {/* Close Button */}
        {/* <Grid item xs={2} display="flex" justifyContent="flex-end">
          <IconButton color="primary">
            <CloseIcon />
          </IconButton>
        </Grid> */}
      </Grid>
    </Box>
  );
};
