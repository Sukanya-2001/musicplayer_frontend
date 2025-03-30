import CloseIcon from "@mui/icons-material/Close";
import PauseIcon from "@mui/icons-material/Pause";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import { Box, Grid, IconButton, Typography } from "@mui/material";
import Image from "next/image";

type MusicPlayerProps = {
  currentSong: {
    img: string;
    title: string;
    desc: string;
  };
  stopSong: () => void;
};

export const MusicPlayer = ({ currentSong, stopSong }: MusicPlayerProps) => {
  return (
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
            src={currentSong.img}
            alt={currentSong.title}
            width={60}
            height={60}
            style={{ borderRadius: "8px" }}
          />
        </Grid>

        <Grid item xs={6}>
          <Typography variant="body2" fontWeight="bold" color="white">
            {currentSong.title}
          </Typography>
          <Typography variant="body2" color="gray">
            {currentSong.desc}
          </Typography>
        </Grid>

        <Grid item xs={2} display="flex" justifyContent="flex-end">
          <IconButton color="primary">
            <SkipPreviousIcon />
            <PauseIcon />
            <SkipNextIcon />
          </IconButton>
        </Grid>

        {/* Close Button */}
        <Grid item xs={2} display="flex" justifyContent="flex-end">
          <IconButton onClick={stopSong} color="primary">
            <CloseIcon />
          </IconButton>
        </Grid>
      </Grid>
    </Box>
  );
};
