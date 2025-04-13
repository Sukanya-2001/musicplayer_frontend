import { useGetSongByGenreHook } from "@/api/functions/discover.api";
import { useGetAllIds, useMakeFavourite } from "@/api/functions/favourite.api";
import { ISongsRes } from "@/api/functions/songs.api";
import ResponsiveDrawer from "@/components/ResponsiveDrawer/ResponsiveDrawer";
import { SongSection } from "@/components/Skeleton/SongSection";
import { SongDuration } from "@/components/Songs/SongDuration";
import { useAppSelector } from "@/hooks/redux/useAppSelector";
import {
  capitalizeFirstLetter,
  checkwistlist
} from "@/hooks/utils/commonUtils";
import { useMakeFavoriteSongs } from "@/hooks/utils/useMakeFavouriteSongs";
import { usePlaySongs } from "@/hooks/utils/useSongs";
import assest from "@/json/assest";
import CustomButtonPrimary from "@/ui/CustomButtons/CustomButtonPrimary";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { Box, CircularProgress, Grid, Typography } from "@mui/material";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import { useMemo } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";

const discoverSongs = () => {
  const searchParams = useSearchParams();
  const queryKey = Array.from(searchParams.keys())[0];
  const router = useRouter();
  const { isLoggedIn } = useAppSelector((s) => s.userSlice);
  const dispatch = useDispatch();

  const {
    data: songsData,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage
  } = useGetSongByGenreHook(queryKey);

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
      usePlaySongs(index, songList, `genre-${queryKey}`, dispatch);
    }
  };
  const { wishListIds } = useAppSelector((s) => s.wishlist);
  const { mutateAsync: getAllFavIds } = useGetAllIds();
  const { mutateAsync: favMutate } = useMakeFavourite();

  const { handleFavourite, disabledFavs } = useMakeFavoriteSongs({
    getAllFavIds,
    favMutate
  });

  return (
    <ResponsiveDrawer>
      <Typography
        variant="body1"
        fontWeight="bold"
        sx={{
          fontSize: {
            xs: "18px", // small devices
            sm: "20px", // tablets
            md: "25px" // desktops
          },
          padding: "0 0 20px 20px"
        }}
      >
        <span style={{ color: "rgb(255 14 188)" }}>
          {capitalizeFirstLetter(queryKey)}
        </span>
        {" Songs"}
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
                  xs={3}
                  sm={2}
                  md={2}
                  display="flex"
                  justifyContent="center"
                >
                  <Image
                    src={!!song?.imageFile ? song?.imageFile : assest?.music}
                    alt={song?.title}
                    width={150}
                    height={150}
                    style={{
                      // borderRadius: "10px",
                      maxWidth: "100%",
                      width: "80px",
                      height: "70px",
                      paddingRight: "10px"
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
                  {isLoggedIn && (
                    <Box
                      onClick={(e) =>
                        handleFavourite(
                          e,
                          song?._id,
                          song?.selectAlbum?._id,
                          song?.selectArtist?.map((item) => item?._id)
                        )
                      }
                    >
                      <CustomButtonPrimary
                        disabled={disabledFavs[song._id]}
                        sx={{ marginLeft: "0px !important" }}
                      >
                        {checkwistlist(song?._id, wishListIds) ? (
                          <FavoriteIcon />
                        ) : (
                          <FavoriteBorderIcon />
                        )}
                      </CustomButtonPrimary>
                    </Box>
                  )}
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
    </ResponsiveDrawer>
  );
};

export default discoverSongs;
