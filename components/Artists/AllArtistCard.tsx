import { Box, Container, Typography } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/router";

type ArtistProps = {
  name: string;
  desc: string;
  img: string;
  id: string;
};

export const AllArtistCard = ({ id, name, desc, img }: ArtistProps) => {
  const router = useRouter();

  return (
    <Box
      position="relative"
      height={{ xs: 200, md: 350 }}
      display="flex"
      alignItems="center"
      bgcolor="black"
      color="white"
      overflow="hidden"
      onClick={()=> router.push(`/artistsSongs/${id}`)}
      sx={{
        margin: { xs: "20px", md: "30px" },
        borderRadius: "10px",
        cursor: "pointer"
      }}
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
        {/* Background Image */}
        <Image
          src={img}
          alt="Music Banner"
          layout="fill"
          objectFit="cover"
          style={{ opacity: "0.4" }}
        />

        {/* Dim Overlay */}
      </Box>

      {/* Content */}
      <Container maxWidth="md" sx={{ position: "relative", zIndex: 10 }}>
        <Typography
          variant="h3"
          color="primary"
          sx={{ fontSize: "40px !important", fontWeight: "bold" }}
        >
          {name}
        </Typography>
        <Typography
          variant="body1"
          mt={2}
          sx={{ maxWidth: "600px", color: "white" }}
        >
          {desc}
        </Typography>
      </Container>
    </Box>
  );
};
