import { LimitedAlbum } from "@/api/functions/home.api";
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
import { AlbumHomeSkeleton } from "../Skeleton/AlbumHomeSkeleton";

type AlbumProps = {
  details: LimitedAlbum[];
  isPending: boolean;
};

export const Album = ({ details, isPending }: AlbumProps) => {
  const router = useRouter();

  return (
    <Box>
      <Typography
        variant="body1"
        fontWeight="bold"
        sx={{ fontSize: "25px", padding: "30px" }}
      >
        Top{" "}
        <Box component="span" color="rgb(255 14 188)">
          Albums
        </Box>{" "}
      </Typography>

      <Box sx={{ padding: "10px 5px" }}>
        {isPending ? (
          <AlbumHomeSkeleton />
        ) : (
          <Grid2 container spacing={2} justifyContent="flex-start">
            {!!details && details?.length > 0 ? (
              details?.map((album, index) => (
                <Grid2
                  key={index}
                  size={{ xs: 6, sm: 6, md: 3, lg: 2 }}
                  display="flex"
                  justifyContent="center"
                  sx={{ cursor: "pointer" }}
                  onClick={() => router.push(`albumSongs/${album?._id}`)}
                >
                  <Card
                    sx={{
                      backgroundColor: "#1e1e1e",
                      color: "white",
                      borderRadius: 4,
                      boxShadow: "none",
                      textAlign: "center",
                      padding: 2,
                      width: "100%",
                      maxWidth: 200
                    }}
                  >
                    <CardMedia
                      component="img"
                      image={album?.file}
                      alt={album?.title}
                      sx={{
                        width: 150,
                        height: 150,
                        borderRadius: "50%",
                        objectFit: "cover",
                        margin: "0 auto",
                        mb: 2
                      }}
                    />
                    <CardContent sx={{ padding: 0 }}>
                      <Typography
                        variant="body1"
                        fontWeight="bold"
                        sx={{ fontSize: "1rem", mb: 0.5 }}
                      >
                        {album?.title}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid2>
              ))
            ) : (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  textAlign: "center",
                  width: "100%"
                }}
              >
                <Typography variant="body2" color="gray">
                  No Album found
                </Typography>
              </Box>
            )}

            {!!details && details?.length > 0 && (
              <Grid2
                size={{ xs: 6, sm: 4, md: 3, lg: 2 }}
                display="flex"
                justifyContent="center"
                alignItems="center"
              >
                <IconButton
                  onClick={() => router.push("/albums")}
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
            )}
          </Grid2>
        )}
      </Box>
    </Box>
  );
};
