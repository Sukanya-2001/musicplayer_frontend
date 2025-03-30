import { useWindowSize } from "@/hooks/utils/commonUtils";
import assest from "@/json/assest";
import AddIcon from "@mui/icons-material/Add";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Grid2,
  IconButton,
  Typography
} from "@mui/material";
import { useRouter } from "next/router";
import { useMemo } from "react";

const songs = [
  {
    title: "Whatever It Takes very important",
    artist: "Imagine Dragons",
    img: assest?.music
  },
  { title: "Skyfall", artist: "Adele", img: assest?.music },
  { title: "Superman", artist: "Eminem", img: assest?.music },
  {
    title: "Softcore",
    artist: "The Neighbourhood",
    img: assest?.music
  },
  {
    title: "The Loneliest",
    artist: "Måneskin",
    img: assest?.music
  }
];

export type SongProps = {
  title: string;
  subTitle: string;
};

const getCharacterLimit = (windowSize: string) => {
  switch (windowSize) {
    case "xxs":
      return 6;
    case "xs":
      return 9;
    case "sm":
      return 20;
    case "smm":
      return 18;
    case "md":
      return 25;
    default:
      return 10;
  }
};

export const SongComp = ({ title, subTitle }: SongProps) => {
  const router = useRouter();
  const windowSize = useWindowSize();
  const characterLimit = useMemo(
    () => getCharacterLimit(windowSize),
    [windowSize]
  );

  return (
    <Box>
      <Typography
        variant="body1"
        fontWeight="bold"
        sx={{ fontSize: "25px", padding: "30px" }}
      >
        {title}{" "}
        <Box component="span" color="rgb(255 14 188)">
          {subTitle}
        </Box>{" "}
      </Typography>
      <Box sx={{ padding: "10px 5px 10px 5px" }}>
        <Grid2 container spacing={2} justifyContent="center">
          {songs.map((song, index) => (
            <Grid2 size={{ xs: 4, sm: 6, md: 4, lg: 2 }} key={index}>
              <Card
                sx={{
                  backgroundColor: "#1e1e1e",
                  color: "white",
                  borderRadius: 2,
                  boxShadow: "none",
                  cursor: "pointer"
                }}
              >
                <CardMedia
                  component="img"
                  height="140"
                  image={song.img}
                  alt={song.title}
                />
                <CardContent>
                  <Typography
                    variant="body1"
                    fontWeight="bold"
                    sx={{
                      fontSize: {
                        xs: "0.875rem",
                        sm: "1rem",
                        md: "1.125rem",
                        lg: "1.25rem"
                      }
                    }}
                  >
                    {song?.title?.length < characterLimit
                      ? song?.title
                      : `${song?.title?.slice(0, characterLimit)}...`}
                  </Typography>
                  <Typography variant="body2" color="gray">
                    {song.artist}
                  </Typography>
                </CardContent>
              </Card>
            </Grid2>
          ))}
          <Grid2
            size={{ xs: 4, sm: 6, md: 4, lg: 2 }}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <IconButton
              onClick={() => router.push("/songs")}
              sx={{
                color: "rgb(255 14 188)",
                display: "flex",
                flexDirection: "column"
              }}
            >
              <AddIcon fontSize="large" />
              <Typography variant="body2" sx={{ color: "rgb(255 14 188)" }}>
                View All
              </Typography>
            </IconButton>
          </Grid2>
        </Grid2>
      </Box>
    </Box>
  );
};
