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
import { Box, CircularProgress, Typography } from "@mui/material";
import Image from "next/image";
import { useMemo } from "react";
import { useDispatch } from "react-redux";
import { SongSection } from "../Skeleton/SongSection";
import { SongDuration } from "../Songs/SongDuration";

type SongSecProps = {
  type: string;
};

export const DiscoverSongSec = ({ type }: SongSecProps) => {
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
    dispatch(setPlaylist(playList));
    dispatch(setCurrentIndex(index));
    dispatch(setActiveSongSource(`discover-${type}`));
    dispatch(play());
  };

  return (
    <Box>
      <Typography
        variant="body1"
        fontWeight="bold"
        sx={{ fontSize: "25px", padding: "5px 20px" }}
      >
        <Box component="span" color="rgb(255 14 188)">
          {type}{" "}
        </Box>
        Songs
      </Typography>

      {isLoading ? (
        <SongSection />
      ) : (
        <Box
        sx={{
            overflowX: "auto", // [FIXED] Allow horizontal scroll
            // whiteSpace: "nowrap", // [FIXED] Ensure children don’t wrap on xs
            px: 1
          }}
        >
          {!!songList && songList.length > 0 ? (
            <Box>
                <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                gap: 2,
                px: 2,
                width: "fit-content",
              }}
            >
              {songList.map((song, index) => (
                <Box
                  key={index}
                  onClick={() => handleSongClick(index)}
                  sx={{
                    minWidth: { xs: "120px", sm: "150px" },
                    width: {
                    //   xs: "calc(50% / 4 - 16px)",
                      md: "calc(90% / 3 - 16px)",
                      lg: "calc(90% / 6  - 16px)"
                    },
                    cursor: "pointer",
                    flex: { xs: "0 0 auto", md: "1 1 auto" },
                    transition: "transform 0.3s",
                    "&:hover": {
                      transform: "scale(1.03)"
                    },
                    backgroundColor: "#2a2a2a",
                    borderRadius: "12px",
                    p: 1,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between"
                  }}
                >
                  <Box
                    sx={{ display: "flex", justifyContent: "center", mb: 1 }}
                  >
                    <Image
                      src={song?.imageFile || assest.music}
                      alt={song?.title}
                      width={120}
                      height={150}
                      style={{
                        borderRadius: "8px",
                        objectFit: "cover",
                        width: "120px",
                        height: "150px"
                      }}
                    />
                  </Box>
                  <Typography
                    variant="body1"
                    fontWeight="bold"
                    color="white"
                    noWrap
                    textAlign="center"
                  >
                    {song?.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="gray"
                    noWrap
                    textAlign="center"
                  >
                    {song?.selectArtist?.map((item) => item?.title).join(", ")}
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      mt: 1
                    }}
                  >
                    <Typography variant="body2" color="white">
                      <SongDuration audioUrl={song?.audioFile} />
                    </Typography>
                    <FavoriteBorderIcon sx={{ color: "white" }} />
                  </Box>
                </Box>
              ))}
            </Box>
            </Box>
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
    </Box>
  );
};
