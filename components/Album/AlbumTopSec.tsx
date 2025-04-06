import { Box, Container, Skeleton, Typography, useTheme } from "@mui/material";
import Image from "next/image";

type AlbumProps = {
  name: string;
  desc: string;
  img: string;
  isLoading: boolean;
};

export const AlbumTopSec = ({ name, desc, img, isLoading }: AlbumProps) => {
  const theme = useTheme();

  if (isLoading) {
    return (
      <Skeleton
        height={350}
        variant="rounded"
        sx={{ bgcolor: "grey.800", margin: { xs: 2, md: 4 } }}
      />
    );
  }

  return (
    <Container maxWidth="lg" sx={{ my: 4 }}>
      <Box
        display="flex"
        flexDirection={{ xs: "column", md: "row" }}
        alignItems={{ xs: "center", md: "center" }} // vertical centering on desktop
        gap={4}
        p={3}
        bgcolor="grey.900"
        borderRadius="20px"
        boxShadow={4}
      >
        {/* Album Image */}
        <Box
          position="relative"
          width={{ xs: "100%", sm: 250 }}
          height={{ xs: 250, sm: 250 }}
          flexShrink={0}
          borderRadius="16px"
          overflow="hidden"
        >
          <Image src={img} alt="Album Cover" layout="fill" objectFit="cover" />
        </Box>

        {/* Album Info */}
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          textAlign={{ xs: "center", md: "left" }}
          color="white"
          flex={1}
          height="100%"
        >
          <Typography
            variant="h3"
            sx={{
              fontWeight: 700,
              fontSize: { xs: "1.8rem", sm: "2rem", md: "2.4rem" },
              color: theme.palette.primary.main,
              mb: 2
            }}
          >
            {name}
          </Typography>

          <Typography
            variant="body1"
            sx={{
              color: "grey.300",
              fontSize: { xs: "1rem", sm: "1.1rem" },
              mb: 3
            }}
          >
            {desc}
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};
