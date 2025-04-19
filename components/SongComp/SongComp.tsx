import { ISongs } from "@/api/functions/home.api";
import { ISongsRes } from "@/api/functions/songs.api";
import { useAppSelector } from "@/hooks/redux/useAppSelector";
import { useWindowSize } from "@/hooks/utils/commonUtils";
import { usePlaySongs } from "@/hooks/utils/useSongs";
import assest from "@/json/assest";
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
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
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
      return 14;
  }
};

export const SongComp = ({
  title,
  subTitle,
  details,
  isPending
}: SongProps) => {
  const router = useRouter();
  const { isLoggedIn } = useAppSelector((s) => s.userSlice);
  const windowSize = useWindowSize();
  const dispatch = useDispatch();
  const characterLimit = useMemo(
    () => getCharacterLimit(windowSize),
    [windowSize]
  );

  const handleRoute = () => {
    if (title === "Recomended") {
      router.push("/recomended-songs");
    } else {
      router.push(`/songs?${title}`);
    }
  };

  const songsList: ISongsRes[] =
    details?.map(
      (item): ISongsRes => ({
        _id: item._id,
        title: item.title,
        subtitle: item.subtitle,
        imageFile: item.imageFile,
        audioFile:
          "https://d30454c5f9k748.cloudfront.net/songs/1743874651790_Thodi%20Jagah%20-%20Marjaavaan%20%28128%20kbps%29.mp3",
        publishYear: "",
        language: "",
        selectAlbum: {
          _id: ""
        },
        selectArtist: [] // empty array
      })
    ) ?? [];

  const handleSongClick = async (index: number) => {
    if (!isLoggedIn) {
      toast.error("Please login to listen songs");
      router.push("/auth/sign-in");
    } else {
      // const convertedSongs = mapWishListToSongsRes(songList);
      usePlaySongs(index, songsList, "", dispatch);
    }
  };

  return (
    <Box mt={2}>
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
          sx={{
            fontSize: {
              xs: "18px", // small devices
              sm: "20px", // tablets
              md: "25px" // desktops
            },
            paddingLeft: "20px"
          }}
        >
          {title} <span style={{ color: "rgb(255 14 188)" }}>{subTitle}</span>{" "}
        </Typography>
        {!!details && details?.length > 0 && (
          <IconButton
            onClick={handleRoute}
            sx={{
              color: "rgb(255 14 188)",
              display: "flex",
              flexDirection: "column",
              padding: "30px"
            }}
          >
            <Typography variant="body1" color="rgb(255 14 188)">
              + View all
            </Typography>
          </IconButton>
        )}
      </Box>

      <Box sx={{ padding: "10px 5px 10px 5px" }}>
        {isPending ? (
          <SongsHomeCard />
        ) : (
          <Grid2 container spacing={2} justifyContent="flex-start">
            {!!details && details?.length > 0 ? (
              details?.map((song, index) => (
                <Grid2 size={{ xs: 4, sm: 6, md: 4, lg: 2 }} key={index}>
                  <Card
                    onClick={() => handleSongClick(index)}
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
                <Typography
                  variant="h3"
                  color="gray"
                  sx={{
                    fontSize: {
                      xs: "18px", // small devices
                      sm: "20px", // tablets
                      md: "25px" // desktops
                    },
                    padding: "30px"
                  }}
                >
                  No songs found
                </Typography>
              </Box>
            )}

            {/* {!!details && details?.length > 0 && (
              <Grid2
                size={{ xs: 4, sm: 6, md: 4, lg: 2 }}
                display="flex"
                justifyContent="center"
                alignItems="center"
              >
                <IconButton
                  onClick={handleRoute}
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
            )} */}
          </Grid2>
        )}
      </Box>
    </Box>
  );
};
