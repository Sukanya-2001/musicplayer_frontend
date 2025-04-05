import assest from "@/json/assest";
import PlayCircleFilledWhiteOutlinedIcon from "@mui/icons-material/PlayCircleFilledWhiteOutlined";
import { Box, Grid, Typography } from "@mui/material";
import Image from "next/image";

export const TopSec = () => {
  return (
    <Box
      sx={{
        margin: { xs: "20px", md: "30px 50px" },
        padding: "30px 0 30px 0",
        backgroundColor: "#1e1e1e",
        borderRadius: "20px"
      }}
    >
      <Grid container spacing={2} justifyContent="center" alignItems="center">
        <Grid item xs={12} md={6} display="flex" justifyContent="center">
          <Image
            src={assest?.music}
            alt="Music Banner"
            width={450}
            height={450}
            style={{ borderRadius: "10px", maxWidth: "100%", height: "auto" }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Box
            sx={{
              textAlign: { xs: "center", md: "left" },
              padding: { xs: "20px", md: "30px" }
            }}
          >
            <Typography
              variant="h3"
              fontWeight="bold"
              fontSize={{ xs: 24, md: 30 }}
              color="white"
            >
              Top songs
            </Typography>
            <Typography variant="body1" color="gray" sx={{ mt: 1 }}>
              On our website, you can access an amazing collection of popular
              and new songs. Stream your favorite tracks in high quality and
              enjoy without interruptions.
            </Typography>
            <Box
              sx={{
                display: "flex",
                justifyContent: { xs: "center", md: "space-between" },
                alignItems: "center",
                flexDirection: { xs: "row" },
                gap: 2,
                mt: 2
              }}
            >
              <Typography
                variant="body1"
                fontWeight="bold"
                color="rgb(255 14 188)"
              >
                20 Songs
              </Typography>
              <Typography
                variant="body1"
                color="rgb(255 14 188)"
                sx={{
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: 1
                }}
              >
                <PlayCircleFilledWhiteOutlinedIcon /> Play all
              </Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};
