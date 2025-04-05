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
        padding: "15px 5px 15px 5px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        zIndex: 999
      }}
    >
      <Grid container alignItems="center">
        <Grid item xs={2} sx={{ paddingRight: "4px !important" }}>
          <Image
            src={currentSong.image}
            alt={currentSong.title}
            width={60}
            height={60}
            style={{ borderRadius: "8px" }}
          />
        </Grid>

        <Grid
          item
          xs={8}
          sx={{
            overflow: "hidden"
          }}
        >
          <Typography
            variant="body2"
            fontWeight="bold"
            color="white"
            noWrap
            sx={{
              maxWidth: { xs: "55%", sm: "70%" },
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap"
            }}
          >
            {currentSong.title}
          </Typography>
          <Typography
            variant="body2"
            color="gray"
            noWrap
            sx={{
              maxWidth: { xs: "55%", sm: "70%" },
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap"
            }}
          >
            {currentSong.artist}
          </Typography>
        </Grid>

        <Grid item xs={2} display="flex" justifyContent="flex-end">
          <Box display="flex" gap={0} p={0} m={0}>
            <IconButton
              color="primary"
              onClick={handlePrev}
              size="small"
              sx={{ padding: "2px !important" }}
            >
              <SkipPreviousIcon />
            </IconButton>
            <IconButton
              color="primary"
              onClick={skipBackward}
              size="small"
              sx={{ padding: "2px !important" }}
            >
              <FastRewindIcon />
            </IconButton>
            <IconButton
              color="primary"
              onClick={handlePlayPause}
              size="small"
              sx={{ padding: "2px !important" }}
            >
              {isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
            </IconButton>
            <IconButton
              color="primary"
              onClick={skipForward}
              size="small"
              sx={{ padding: "2px !important" }}
            >
              <FastForwardIcon />
            </IconButton>
            <IconButton
              color="primary"
              onClick={handleNext}
              size="small"
              sx={{ padding: "2px !important" }}
            >
              <SkipNextIcon />
            </IconButton>
          </Box>
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
