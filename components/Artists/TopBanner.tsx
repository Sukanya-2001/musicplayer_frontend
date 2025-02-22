import assest from "@/json/assest";
import { Box, Container, Typography } from "@mui/material";
import Image from "next/image";

export const TopBanner = () => {
  return (
    <Box
      position="relative"
      height={{ xs: 200, md: 400 }}
      display="flex"
      alignItems="center"
      bgcolor="black"
      color="white"
      overflow="hidden"
      sx={{ margin: { xs: "20px", md: "30px" }, borderRadius: "10px" }}
    >
      {/* Background Image */}
      <Box
        position="absolute"
        top={0}
        left={0}
        width="100%"
        height="100%"
        zIndex={1}
      >
        <Image
          src={assest?.singerBanner}
          alt="Music Banner"
          layout="fill"
          objectFit="cover"
        />
      </Box>

      {/* Content */}
      <Container maxWidth="md" sx={{ position: "relative", zIndex: 10 }}>
        <Typography variant="h3" fontWeight="bold" fontSize={30}>
          Arijit Singh
        </Typography>
        <Typography
          variant="body1"
          color="gray"
          mt={2}
          sx={{ maxWidth: "500px" }}
        >
          On our website, you can access an amazing collection of popular and
          new songs. Stream your favorite tracks in high quality.
        </Typography>
      </Container>
    </Box>
  );
};
