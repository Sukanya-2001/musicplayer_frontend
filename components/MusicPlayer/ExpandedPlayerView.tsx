import { useAppDispatch } from "@/hooks/redux/useAppDispatch";
import { useAudioPlayer } from "@/hooks/utils/useAudioPlayer";
import { resetAll } from "@/reduxtoolkit/slices/playerSlice";
import CloseIcon from "@mui/icons-material/Close";
import FastForwardIcon from "@mui/icons-material/FastForward";
import FastRewindIcon from "@mui/icons-material/FastRewind";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import PauseIcon from "@mui/icons-material/Pause";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import { Box, IconButton, Typography } from "@mui/material";
import Image from "next/image";

export const ExpandedPlayerView = ({
  onCollapse
}: {
  onCollapse: () => void;
}) => {
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

  if (!currentSong) return null;

  return (
    <Box sx={{ p: 2, display: "flex", flexDirection: "column", gap: 1 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <IconButton onClick={onCollapse}>
          <KeyboardArrowDownIcon sx={{ color: "white" }} />
        </IconButton>
        <IconButton onClick={() => dispatch(resetAll())}>
          <CloseIcon sx={{ color: "white" }} />
        </IconButton>
      </Box>

      <Box display="flex" justifyContent="center" my={2}>
        <Image
          src={currentSong.image}
          alt={currentSong.title}
          width={180}
          height={180}
          style={{ borderRadius: "16px" }}
        />
      </Box>

      <Typography variant="h6" textAlign="center" color="white" noWrap>
        {currentSong.title}
      </Typography>
      <Typography variant="body2" textAlign="center" color="gray" noWrap>
        {currentSong.artist}
      </Typography>

      <Box
        sx={{
          width: "100%",
          height: "6px",
          backgroundColor: "#444",
          borderRadius: "3px",
          overflow: "hidden",
          my: 1
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
        display="flex"
        justifyContent="space-between"
        color="#ccc"
        fontSize="14px"
      >
        <span>{currentTimeFormatted}</span>
        <span>{durationFormatted}</span>
      </Box>

      <Box display="flex" justifyContent="center" gap={1} my={1}>
        <IconButton onClick={handlePrev} disabled={isFirstSong}>
          <SkipPreviousIcon sx={{ color: "white" }} />
        </IconButton>
        <IconButton onClick={skipBackward}>
          <FastRewindIcon sx={{ color: "white" }} />
        </IconButton>
        <IconButton onClick={handlePlayPause}>
          {isPlaying ? (
            <PauseIcon sx={{ color: "white" }} />
          ) : (
            <PlayArrowIcon sx={{ color: "white" }} />
          )}
        </IconButton>
        <IconButton onClick={skipForward}>
          <FastForwardIcon sx={{ color: "white" }} />
        </IconButton>
        <IconButton onClick={handleNext} disabled={isLastSong}>
          <SkipNextIcon sx={{ color: "white" }} />
        </IconButton>
      </Box>
    </Box>
  );
};
