import {
  ISongsRes,
  useGetRecomendedSongsHook
} from "@/api/functions/songs.api";
import { useAppSelector } from "@/hooks/redux/useAppSelector";
import { usePlaySongs } from "@/hooks/utils/useSongs";
import assest from "@/json/assest";
import CustomButtonPrimary from "@/ui/CustomButtons/CustomButtonPrimary";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { Box, CircularProgress, Typography } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { SongSection } from "../Skeleton/SongSection";
import { SongDuration } from "../Songs/SongDuration";

type SongSecProps = {
  type: string;
};

export const DiscoverSongSec = ({ type }: SongSecProps) => {
  const dispatch = useDispatch();
  const { isLoggedIn } = useAppSelector((s) => s.userSlice);
  const router = useRouter();
  const [width, setWidth] = useState<number>(0);

  const {
    data: songsData,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage
  } = useGetRecomendedSongsHook();

  useEffect(() => {
    const resizeFunction = () => {
      if (typeof window === "undefined") return "450px";
      setWidth(window.innerWidth);
      console.log(window.innerWidth);
    };

    // Add event listener
    window.addEventListener("resize", resizeFunction);

    // Initial call to set width
    resizeFunction();

    // Cleanup on unmount
    return () => {
      window.removeEventListener("resize", resizeFunction);
    };
  }, []);

  const songList: ISongsRes[] = useMemo(() => {
    if (songsData) {
      return songsData?.pages?.flatMap((s) => s?.songs || []);
    }

    return [];
  }, [JSON.stringify(songsData)]);

  const handleSongClick = async (index: number) => {
    if (!isLoggedIn) {
      toast.error("Please login to listen songs");
      router.push("/auth/sign-in");
    } else {
      usePlaySongs(index, songList, `discover-${type}`, dispatch);
    }
  };

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
          sx={{ fontSize: "25px", padding: "5px 20px" }}
        >
          <Box component="span" color="rgb(255 14 188)">
            {type}{" "}
          </Box>
          Songs
        </Typography>
        <Typography
          variant="body1"
          sx={{
            padding: "5px 20px",
            color: "rgb(255 14 188)",
            cursor: "pointer"
          }}
        >
          View all
        </Typography>
      </Box>

      {isLoading ? (
        <SongSection />
      ) : (
        <Box
          sx={{
            overflowX: "scroll",
            width: {
              xs: `calc(${width}px - 10px)`,
              sm: `calc(${width}px - 250px)`,
              md: `calc(${width}px - 250px)`
            }
          }}
        >
          {!!songList && songList.length > 0 ? (
            <Box
              sx={{
                display: "flex",
                gap: "40px",

                padding: "20px"
              }}
            >
              {songList.map((song, index) => (
                <Box key={index} onClick={() => handleSongClick(index)}>
                  <Box>
                    <Image
                      src={song?.imageFile || assest.music}
                      alt={song?.title}
                      width={120}
                      height={150}
                      style={{
                        borderRadius: "8px",
                        objectFit: "cover",
                        minWidth: "200px",
                        height: "200px"
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
