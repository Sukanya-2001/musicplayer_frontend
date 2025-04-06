import {
  ISongsRes,
  useGetRecomendedSongsHook
} from "@/api/functions/songs.api";
import { generatePlaylistWithMeta } from "@/hooks/utils/commonUtils";
import assest from "@/json/assest";
import {
  play,
  resetAll,
  setActiveSongSource,
  setCurrentIndex,
  setPlaylist
} from "@/reduxtoolkit/slices/playerSlice";
import CustomButtonPrimary from "@/ui/CustomButtons/CustomButtonPrimary";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { Box, CircularProgress, Grid, Typography } from "@mui/material";
import Image from "next/image";
import { useMemo } from "react";
import { useDispatch } from "react-redux";
import { SongSection } from "../Skeleton/SongSection";
import { SongDuration } from "./SongDuration";

type SongSecProps = {
  title: string;
  subTitle: string;
};

export const RecomendedSec = ({ title, subTitle }: SongSecProps) => {
  const dispatch = useDispatch();

  const {
    data: songsData,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage
  } = useGetRecomendedSongsHook();

  const songList: ISongsRes[] = useMemo(() => {
    if (songsData) {
      return songsData?.pages?.flatMap((s) => s?.songs || []);
    }

    return [];
  }, [JSON.stringify(songsData)]);

  const handleSongClick = async (index: number) => {
    dispatch(resetAll());
    const playList = await generatePlaylistWithMeta(songList);
    dispatch(setPlaylist(playList)); // save all 3 songs
    dispatch(setCurrentIndex(index));
    dispatch(setActiveSongSource("recommended")); //for api call
    dispatch(play());
  };

  return (
    <Box>
      <Typography
        variant="body1"
        fontWeight="bold"
        sx={{ fontSize: "25px", padding: "30px", marginTop: "25px" }}
      >
        {title}{" "}
        <Box component="span" color="rgb(255 14 188)">
          {subTitle}
        </Box>{" "}
      </Typography>
      {isLoading ? (
        <SongSection />
      ) : (
        <Box
          sx={{
            margin: { xs: "0 10px", md: "0 20px", lg: "0 50px" },
            backgroundColor: "#1e1e1e",
            borderRadius: "12px"
          }}
        >
          {!!songList && songList?.length > 0 ? (
            songList?.map((song, index) => (
              <Grid
                container
                alignItems="center"
                key={index}
                sx={{
                  padding: "10px",
                  borderBottom: "1px solid #333",
                  cursor: "pointer"
                }}
                onClick={() => handleSongClick(index)}
              >
                {/* Image Section */}
                <Grid
                  item
                  xs={2}
                  sm={2}
                  md={1}
                  display="flex"
                  justifyContent="center"
                >
                  <Image
                    src={!!song?.imageFile ? song?.imageFile : assest?.music}
                    alt={song?.title}
                    width={70}
                    height={70}
                    style={{
                      // borderRadius: "10px",
                      maxWidth: "100%",
                      width: "80px",
                      height: "50px",
                      marginRight: "10px"
                    }}
                  />
                </Grid>

                {/* Song Info */}
                <Grid item xs={6} sm={7} md={8}>
                  <Typography
                    variant="body2"
                    fontWeight="bold"
                    noWrap
                    color="white"
                    sx={{
                      maxWidth: "100%",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap"
                    }}
                  >
                    {song?.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="gray"
                    noWrap
                    sx={{ maxWidth: "200px" }}
                  >
                    {song?.selectArtist?.map((item) => item?.title).join(", ")}
                  </Typography>
                </Grid>

                {/* Duration and Favorite */}
                <Grid
                  item
                  xs={3}
                  sm={3}
                  md={2}
                  display="flex"
                  justifyContent="flex-end"
                  alignItems={"center"}
                >
                  <Typography variant="body2" sx={{ mr: 1 }} color="white">
                    <SongDuration audioUrl={song?.audioFile} />
                  </Typography>
                  <FavoriteBorderIcon />
                </Grid>
              </Grid>
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
        </Box>
      )}

      {!!hasNextPage && (
        <Box
          p={2}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          {" "}
          <CustomButtonPrimary
            variant="contained"
            color="primary"
            onClick={() => {
              fetchNextPage();
            }}
            type="button"
            disabled={isFetchingNextPage}
          >
            {isFetchingNextPage ? (
              <CircularProgress size={28} sx={{ color: "white" }} />
            ) : (
              "Load more"
            )}
          </CustomButtonPrimary>
        </Box>
      )}

      {/* Bottom Music Player */}
      {/* {isPlayerOpen && currentSong && (
        <MusicPlayer currentSong={currentSong} stopSong={handleMusicPlayer} />
      )} */}
    </Box>
  );
};
