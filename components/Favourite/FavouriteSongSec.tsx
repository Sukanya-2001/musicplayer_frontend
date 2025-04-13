import {
  IWishListItem,
  useGetAllIds,
  useGetFavoriteSongsHook,
  useMakeFavourite
} from "@/api/functions/favourite.api";
import { ISongsRes } from "@/api/functions/songs.api";
import { SongSection } from "@/components/Skeleton/SongSection";
import { SongDuration } from "@/components/Songs/SongDuration";
import { useAppSelector } from "@/hooks/redux/useAppSelector";
import { checkwistlist } from "@/hooks/utils/commonUtils";
import { useMakeFavoriteSongs } from "@/hooks/utils/useMakeFavouriteSongs";
import { usePlaySongs } from "@/hooks/utils/useSongs";
import assest from "@/json/assest";
import CustomButtonPrimary from "@/ui/CustomButtons/CustomButtonPrimary";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { Box, CircularProgress, Grid, Typography } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/router";
import { useMemo } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";

export const mapWishListToSongsRes = (wishlist: IWishListItem[]): ISongsRes[] => {
  return wishlist.map((item) => ({
    _id: item.song._id,
    title: item.song.title,
    subtitle: item.song.subtitle,
    publishYear: item.song.publishYear.toString(),
    imageFile: item.song.imageFile,
    audioFile: item.song.audioFile,
    language: item.song.language,
    selectAlbum: {
      _id: item.song.selectAlbum,
    },
    selectArtist: item.artist.map((artist) => ({
      _id: artist._id,
      title: artist.title,
    })),
  }));
};

export const FavouriteSongSec = () => {
  const { isLoggedIn, userData } = useAppSelector((s) => s.userSlice);
  const dispatch = useDispatch();
  const router = useRouter();

  const {
    data: songsData,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch
  } = useGetFavoriteSongsHook(userData?._id ?? "");

  const songList: IWishListItem[] = useMemo(() => {
    if (songsData) {
      
      return songsData?.pages?.flatMap((s) => s?.wishList || []);
    }

    return [];
  }, [JSON.stringify(songsData)]);

  const handleSongClick = async (index: number) => {
    if (!isLoggedIn) {
      toast.error("Please login to listen songs");
      router.push("/auth/sign-in");
    } else {
      const convertedSongs = mapWishListToSongsRes(songList);
      usePlaySongs(index, convertedSongs, "favourite", dispatch);
    }
  };
  const { wishListIds } = useAppSelector((s) => s.wishlist);
  const { mutateAsync: getAllFavIds } = useGetAllIds();
  const { mutateAsync: favMutate } = useMakeFavourite();

  const { handleFavourite, disabledFavs } = useMakeFavoriteSongs({
    getAllFavIds,
    favMutate,
    refetch
  });

  return (
    <Box>
      <Typography
        variant="body1"
        fontWeight="bold"
        sx={{
          fontSize: {
            xs: "18px", // small devices
            sm: "20px", // tablets
            md: "25px" // desktops
          },
          padding: "20px"
        }}
      >
        <span style={{ color: "rgb(255 14 188)" }}>Favourite</span>
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
                    src={!!song?.song?.imageFile ? song?.song?.imageFile : assest?.music}
                    alt={song?.song?.title}
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
                    {song?.song?.title}
                  </Typography>

                  <Typography
                    variant="body2"
                    color="gray"
                    noWrap
                    sx={{ maxWidth: "200px" }}
                  >
                    {song?.artist?.map((item) => item?.title).join(", ")}
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
                    <SongDuration audioUrl={song?.song?.audioFile} />
                  </Typography>
                  {isLoggedIn && (
                    <Box
                      onClick={(e) =>
                        handleFavourite(
                          e,
                          song?.song?._id,
                          song?.song?.selectAlbum,
                          song?.song?.selectArtist?.map((item) => item)
                        )
                      }
                    >
                      <CustomButtonPrimary
                        disabled={disabledFavs[song.song._id]}
                        sx={{ marginLeft: "0px !important" }}
                      >
                        {checkwistlist(song?.song?._id, wishListIds) ? (
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
    </Box>
  );
};
