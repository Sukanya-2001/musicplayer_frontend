import { useAppDispatch } from "@/hooks/redux/useAppDispatch";
import { useAudioPlayer } from "@/hooks/utils/useAudioPlayer";
import { resetAll } from "@/reduxtoolkit/slices/playerSlice";
import CloseIcon from "@mui/icons-material/Close";
import FastForwardIcon from "@mui/icons-material/FastForward";
import FastRewindIcon from "@mui/icons-material/FastRewind";
import PauseIcon from "@mui/icons-material/Pause";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import { Box, Grid, IconButton, Typography } from "@mui/material";
import Image from "next/image";

const MiniPlayerView = ({ onExpand }: { onExpand: () => void }) => {
  const {
    isPlaying,
    handlePlayPause,
    handleNext,
    handlePrev,
    skipForward,
    skipBackward,
    currentSong,
    progress,
    currentTimeFormatted,
    durationFormatted,
    isFirstSong,
    isLastSong
  } = useAudioPlayer();

  const dispatch = useAppDispatch();

  const handleCloseSong = () => {
    dispatch(resetAll());
  };

  return (
    <Box
      onClick={onExpand}
      sx={{
        position: "fixed",
        bottom: 0,
        right: 0,
        width: { xs: "100vw", sm: "65vw", md: "50vw", lg: "30vw" },
        backgroundColor: "#1e1e1e",
        paddingBottom: "8px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        zIndex: 999,
        flexDirection: "column"
      }}
    >
      {/* Progress Bar */}
      <Box
        sx={{
          width: "100%",
          height: "6px",
          backgroundColor: "#444",
          borderRadius: "3px",
          overflow: "hidden",
          mb: "1px",
          position: "relative"
        }}
      >
        <Box
          sx={{
            height: "100%",
            backgroundColor: "rgb(255 14 188)",
            width: `${progress}%`,
            transition: "width 0.2s linear"
          }}
        />
      </Box>
      <Box
        sx={{
          // position: "relative",
          // top: "100%",
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          padding: "0 8px",
          fontSize: "12px",
          color: "#ccc",
          mt: "1px"
        }}
      >
        <span>{currentTimeFormatted}</span>
        <span>{durationFormatted}</span>
      </Box>

      {/* Main Controls & Info */}
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
              maxWidth: "100%",
              textOverflow: "ellipsis"
            }}
          >
            {currentSong.title}
          </Typography>
          <Typography
            variant="body2"
            color="gray"
            noWrap
            sx={{
              maxWidth: "100%",
              textOverflow: "ellipsis"
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
              disabled={isFirstSong}
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
              disabled={isLastSong}
              sx={{ padding: "2px !important" }}
            >
              <SkipNextIcon />
            </IconButton>
            <IconButton
              color="primary"
              onClick={handleCloseSong}
              size="small"
              sx={{ padding: "2px !important" }}
            >
              <CloseIcon />
            </IconButton>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default MiniPlayerView;
