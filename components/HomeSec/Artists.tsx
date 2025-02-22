import assest from "@/json/assest";
import { Avatar, Box, Grid2, Typography } from "@mui/material";
import { useRouter } from "next/router";

const artists = [
  { name: "Eminem", img: assest?.singer },
  { name: "The Weekend", img: assest?.singer },
  { name: "Adele", img: assest?.singer },
  { name: "Lana Del Rey", img: assest?.singer },
  { name: "Harry Styles", img: assest?.singer },
  { name: "Billie Eilish", img: assest?.singer },
  { name: "Drake", img: assest?.singer },
  { name: "Ed Sheeran", img: assest?.singer }
];

export const Artists = () => {
  const route = useRouter();

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center"
        }}
      >
        <Typography
          variant="body1"
          fontWeight="bold"
          sx={{ fontSize: "25px", padding: "30px" }}
        >
          Popular{" "}
          <Box component="span" color="rgb(255 14 188)">
            Artists
          </Box>
        </Typography>
        <Typography
          variant="body1"
          color="rgb(255 14 188)"
          sx={{ cursor: "pointer", padding: "30px" }}
          onClick={() => route.push("/artists")}
        >
          + View all
        </Typography>
      </Box>

      <Box sx={{ padding: "10px 5px 10px 5px" }}>
        <Grid2 container spacing={2} justifyContent="center">
          {artists.map((artist, index) => (
            <Grid2 size={{ xs: 4, sm: 4, md: 3, lg: 1.5 }} key={index}>
              <Box onClick={() => route.push("/artistsSongs")}>
                <Avatar
                  src={artist.img}
                  sx={{ width: 100, height: 100, margin: "auto" }}
                />
                <Typography
                  variant="body2"
                  sx={{ marginTop: 1, color: "white", textAlign: "center" }}
                >
                  {artist.name}
                </Typography>
              </Box>
            </Grid2>
          ))}
        </Grid2>
      </Box>
    </Box>
  );
};
