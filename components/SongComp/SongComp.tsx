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

const songs = [
  {
    title: "Whatever It Takes",
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

type SongProps = {
  title: string;
  subTitle: string;
};
export const SongComp = ({ title, subTitle }: SongProps) => {
  const router = useRouter();

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
                  boxShadow: "none"
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
                    {song.title}
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
