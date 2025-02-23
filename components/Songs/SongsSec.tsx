import assest from "@/json/assest";
import CloseIcon from "@mui/icons-material/Close";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import PauseIcon from "@mui/icons-material/Pause";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import { Box, Grid, IconButton, Typography } from "@mui/material";
import Image from "next/image";
import { useState } from "react";
import { SongProps } from "../SongComp/SongComp";

export type Isongs = {
  img: string;
  title: string;
  desc: string;
  time: string;
};

const songs: Isongs[] = [
  {
    img: assest?.music,
    title: "Cry For Me - The Weeknd",
    desc: "Hurry Up Tomorrow",
    time: "02:54"
  },
  {
    img: assest?.music,
    title: "Blinding Lights - The Weeknd",
    desc: "After Hours",
    time: "03:22"
  },
  {
    img: assest?.music,
    title: "Save Your Tears - The Weeknd",
    desc: "After Hours",
    time: "03:35"
  },
  {
    img: assest?.music,
    title: "Starboy - The Weeknd",
    desc: "Starboy",
    time: "03:50"
  }
];

export const SongsSec = ({ title, subTitle }: SongProps) => {
  const [isPlayerOpen, setIsPlayerOpen] = useState(false);
  const [currentSong, setCurrentSong] = useState<Isongs | null>(null);

  const handleSongClick = (song: Isongs) => {
    setCurrentSong(song);
    setIsPlayerOpen(true);
  };

  return (
    <Box>
      <Typography
        variant="body1"
        fontWeight="bold"
        sx={{ fontSize: "25px", padding: "30px", marginTop: "25px" }}
      >
        {title}{" "}
        <Box component="span" color="rgb(255 14 188)">
          {subTitle}
        </Box>{" "}
      </Typography>
      <Box
        sx={{
          margin: { xs: "0 10px", md: "0 20px", lg: "0 50px" },
          backgroundColor: "#1e1e1e",
          borderRadius: "12px"
        }}
      >
        {songs.map((song, index) => (
          <Grid
            container
            alignItems="center"
            key={index}
            sx={{
              padding: "10px",
              borderBottom: "1px solid #333",
              cursor: "pointer"
            }}
            onClick={() => handleSongClick(song)}
          >
            {/* Image Section */}
            <Grid
              item
              xs={3}
              sm={2}
              md={2}
              display="flex"
              justifyContent="center"
            >
              <Image
                src={song.img}
                alt={song.title}
                width={150}
                height={150}
                style={{
                  borderRadius: "10px",
                  maxWidth: "100%",
                  height: "auto",
                  paddingRight: "10px"
                }}
              />
            </Grid>

            {/* Song Info */}
            <Grid item xs={6} sm={7} md={8}>
              <Typography
                variant="body2"
                fontWeight="bold"
                noWrap
                color="white"
              >
                {song.title}
              </Typography>
              <Typography variant="body2" color="gray" noWrap>
                {song.desc}
              </Typography>
            </Grid>

            {/* Duration and Favorite */}
            <Grid
              item
              xs={3}
              sm={3}
              md={2}
              display="flex"
              justifyContent="flex-end"
            >
              <Typography variant="body2" sx={{ mr: 1 }} color="white">
                {song.time}
              </Typography>
              <FavoriteBorderIcon />
            </Grid>
          </Grid>
        ))}
      </Box>

      {/* Bottom Music Player */}
      {isPlayerOpen && currentSong && (
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
              <IconButton
                onClick={() => setIsPlayerOpen(false)}
                color="primary"
              >
                <CloseIcon />
              </IconButton>
            </Grid>
          </Grid>
        </Box>
      )}
    </Box>
  );
};
