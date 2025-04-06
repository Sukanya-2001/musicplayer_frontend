import { LimitedArtist } from "@/api/functions/home.api";
import assest from "@/json/assest";
import { Avatar, Box, Grid2, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { ArtistHomeSkeleton } from "../Skeleton/ArtistHomeSkeleton";

type ArtistProps = {
  details: LimitedArtist[];
  isPending: boolean;
};

export const Artists = ({ details, isPending }: ArtistProps) => {
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
          Recomended{" "}
          <Box component="span" color="rgb(255 14 188)">
            Artists
          </Box>
        </Typography>
        {!!details && details?.length > 0 && (
          <Typography
            variant="body1"
            color="rgb(255 14 188)"
            sx={{ cursor: "pointer", padding: "30px" }}
            onClick={() => route.push("/artists")}
          >
            + View all
          </Typography>
        )}
      </Box>

      <Box sx={{ padding: "10px 5px 10px 5px" }}>
        {isPending ? (
          <ArtistHomeSkeleton />
        ) : (
          <Grid2 container spacing={2} justifyContent="flex-start">
            {!!details && details?.length > 0 ? (
              details?.map((artist, index) => (
                <Grid2 size={{ xs: 4, sm: 4, md: 3, lg: 1.5 }} key={index}>
                  <Box
                    onClick={() => route.push(`/artistsSongs/${artist?._id}`)}
                    sx={{ cursor: "pointer" }}
                  >
                    <Avatar
                      src={!!artist?.file ? artist?.file : assest?.singer}
                      sx={{ width: 100, height: 100, margin: "auto" }}
                    />
                    <Typography
                      variant="body2"
                      sx={{ marginTop: 1, color: "white", textAlign: "center" }}
                    >
                      {artist?.title}
                    </Typography>
                  </Box>
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
                  No artist found
                </Typography>
              </Box>
            )}
          </Grid2>
        )}
      </Box>
    </Box>
  );
};
