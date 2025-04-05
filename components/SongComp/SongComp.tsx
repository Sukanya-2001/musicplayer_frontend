import { ISongs } from "@/api/functions/home.api";
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
import { SongsHomeCard } from "../Skeleton/SongsHomeCard";

export type SongProps = {
  title: string;
  subTitle: string;
  details: ISongs[];
  isPending: boolean;
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

export const SongComp = ({
  title,
  subTitle,
  details,
  isPending
}: SongProps) => {
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
        {isPending ? (
          <SongsHomeCard />
        ) : (
          <Grid2 container spacing={2} justifyContent="flex-start">
            {!!details && details?.length > 0 ? (
              details?.map((song, index) => (
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
                      image={
                        !!song?.imageFile ? song?.imageFile : assest?.music
                      }
                      alt={song.title}
                      sx={{
                        maxHeight: { xs: "100px", sm: "140px" },
                        minHeight: { xs: "100px", sm: "140px" }
                      }}
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
                        {song?.subtitle}
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
                  No songs found
                </Typography>
              </Box>
            )}

            {!!details && details?.length > 5 && (
              <Grid2
                size={{ xs: 4, sm: 6, md: 4, lg: 2 }}
                display="flex"
                justifyContent="center"
                alignItems="center"
              >
                <IconButton
                  onClick={() => router.push(`/songs?${title}`)}
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
