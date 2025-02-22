import { Box, Container, Typography } from "@mui/material";
import Image from "next/image";

type ArtistProps = {
  name: string;
  desc: string;
  img: string;
};

export const TopBanner = ({ name, desc, img }: ArtistProps) => {
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
        <Image src={img} alt="Music Banner" layout="fill" objectFit="cover" />
      </Box>

      {/* Content */}
      <Container maxWidth="md" sx={{ position: "relative", zIndex: 10 }}>
        <Typography variant="h3" fontWeight="bold" fontSize={30}>
          {name}
        </Typography>
        <Typography
          variant="body1"
          color="gray"
          mt={2}
          sx={{ maxWidth: "500px" }}
        >
          {desc}
        </Typography>
      </Container>
    </Box>
  );
};
