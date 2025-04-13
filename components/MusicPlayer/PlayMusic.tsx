// components/PlayMusic.tsx
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
import { Box, Collapse, Grid, IconButton, Typography } from "@mui/material";
import Image from "next/image";
import { useState } from "react";

export const PlayMusic = () => {
  const [isExpanded, setExpanded] = useState<boolean>(false);
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

  const handleCloseSong = () => {
    dispatch(resetAll());
  };

  return (
    <Box>
      <Collapse in={isExpanded}>
        <Box
          sx={{
            p: 2,

            // display: "flex",
            // flexDirection: "column",
            gap: 1,
            position: "fixed",
            bottom: 0,
            right: 0,
            width: { xs: "100vw", sm: "65vw", md: "50vw", lg: "30vw" },
            backgroundColor: "#1e1e1e",
            paddingBottom: "8px",
            alignItems: "center",

            height: "80vh",
            
            // justifyContent: "space-between",
            zIndex: 999
          }}
        >
          <Box
            display="flex"
            justifyContent="space-between"
            flexDirection="row"
            alignItems="center"
          >
            <IconButton onClick={() => setExpanded(false)}>
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
              style={{
                borderRadius: "16px",
                minHeight: "200px",
                width: "fit-content"
              }}
            />
          </Box>
          <Box sx={{ marginBottom: "30px" }}>
            <Typography
              variant="h2"
              textAlign="center"
              color="white"
              noWrap
              sx={{ fontSize: "24px" }}
            >
              {currentSong.title}
            </Typography>
            <Typography variant="body2" textAlign="center" color="gray" noWrap>
              {currentSong.artist}
            </Typography>
          </Box>

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
      </Collapse>
      {!isExpanded && (
        <Box
          
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
            <Grid item xs={2} sx={{ paddingRight: "4px !important" }} onClick={() => setExpanded(true)}>
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
              onClick={() => setExpanded(true)}
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
      )}
    </Box>
  );
};
