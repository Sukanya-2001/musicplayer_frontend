import assest from "@/json/assest";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import {
  Box,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Popover,
  Typography
} from "@mui/material";
import Image from "next/image";
import { useState } from "react";
import { SongsPopover } from "../Popover/SongsPopover";

export type Isongs= {
    img: string;
    title: string;
    desc: string;
    time: string;
}

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

export const SongsSec = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedSong, setSelectedSong] = useState<Isongs | undefined>(undefined);

  const handleOpen = (event: any, song: Isongs) => {
    setAnchorEl(event.currentTarget);
    setSelectedSong(song);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setSelectedSong(undefined);
  };

  return (
    <Box
      sx={{
        margin: { xs: "10px", md: "20px", lg: "50px" },
        backgroundColor: "#1e1e1e",
        borderRadius: "12px"
      }}
    >
      {songs.map((song: Isongs, index: number) => (
        <Grid
          container
          alignItems="center"
          key={index}
          sx={{ padding: "10px", borderBottom: "1px solid #333" }}
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
            <Typography variant="body2" fontWeight="bold" noWrap color="white">
              {song.title}
            </Typography>
            <Typography variant="body2" color="gray" noWrap>
              {song.desc}
            </Typography>
          </Grid>

          {/* Duration and Menu */}
          <Grid
            item
            xs={3}
            sm={3}
            md={2}
            display="flex"
            justifyContent="flex-end"
            alignItems="center"
          >
            <Typography variant="body2" sx={{ mr: 1 }} color="white">
              {song.time}
            </Typography>
            <IconButton onClick={(event) => handleOpen(event, song)}>
              <MoreVertIcon sx={{ fontSize: "20px", color: "gray" }} />
            </IconButton>
          </Grid>
        </Grid>
      ))}

      {/* Popover for Options */}
      <SongsPopover anchorEl={anchorEl} selectedSong={selectedSong!} handleClose={handleClose}/>
    </Box>
  );
};
