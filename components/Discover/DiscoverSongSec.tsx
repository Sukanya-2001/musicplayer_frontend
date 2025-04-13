import { ISongsRes } from "@/api/functions/songs.api";
import { useAppSelector } from "@/hooks/redux/useAppSelector";
import { capitalizeFirstLetter, checkwistlist } from "@/hooks/utils/commonUtils";
import { usePlaySongs } from "@/hooks/utils/useSongs";
import assest from "@/json/assest";
import CustomButtonPrimary from "@/ui/CustomButtons/CustomButtonPrimary";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { Box, Typography } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { SongDuration } from "../Songs/SongDuration";
import { useGetAllIds, useMakeFavourite } from "@/api/functions/favourite.api";
import { useMakeFavoriteSongs } from "@/hooks/utils/useMakeFavouriteSongs";

type SongSecProps = {
  type: string;
  songs: ISongsRes[];
};

export const DiscoverSongSec = ({ type, songs }: SongSecProps) => {
  const dispatch = useDispatch();
  const { isLoggedIn } = useAppSelector((s) => s.userSlice);
  const router = useRouter();
  const [width, setWidth] = useState<number>(0);

  useEffect(() => {
    const resizeFunction = () => {
      if (typeof window === "undefined") return "450px";
      setWidth(window.innerWidth);
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

  const handleSongClick = async (index: number) => {
    if (!isLoggedIn) {
      toast.error("Please login to listen songs");
      router.push("/auth/sign-in");
    } else {
      usePlaySongs(index, songs, `discover-${type}`, dispatch);
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
          sx={{
            fontSize: {
              xs: "18px", // small devices
              sm: "20px", // tablets
              md: "25px" // desktops
            },
            padding: "10px 20px"
          }}
        >
          <Box component="span" color="rgb(255 14 188)">
            {capitalizeFirstLetter(type)}{" "}
          </Box>
          Songs
        </Typography>
        <Typography
          variant="body1"
          onClick={() => router.push(`/discover-songs?${type}`)}
          sx={{
            padding: "5px 20px",
            color: "rgb(255 14 188)",
            cursor: "pointer"
          }}
        >
          View all
        </Typography>
      </Box>

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
        {!!songs && songs.length > 0 ? (
          <Box
            sx={{
              display: "flex",
              gap: "40px",

              padding: "20px"
            }}
          >
            {songs.map((song, index) => (
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
                      minWidth: "150px",
                      height: "180px"
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
                {/* <Typography
                  variant="body2"
                  color="gray"
                  noWrap
                  textAlign="center"
                >
                  {song?.selectArtist?.map((item) => item?.title).join(", ")}
                </Typography> */}
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

      {/* {!!hasNextPage && (
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
      )} */}
    </Box>
  );
};
