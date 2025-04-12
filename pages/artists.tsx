import { Artist, useGetAllArtistHook } from "@/api/functions/artist.api";
import ResponsiveDrawer from "@/components/ResponsiveDrawer/ResponsiveDrawer";
import { ArtistHomeSkeleton } from "@/components/Skeleton/ArtistHomeSkeleton";
import assest from "@/json/assest";
import CustomButtonPrimary from "@/ui/CustomButtons/CustomButtonPrimary";
import {
  Avatar,
  Box,
  CircularProgress,
  Grid2,
  Typography
} from "@mui/material";
import { useRouter } from "next/router";
import { useMemo } from "react";

const Artists = () => {
  const router = useRouter();
  const {
    data: artistData,
    isLoading: artistListPending,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage
  } = useGetAllArtistHook();

  const artistList: Artist[] = useMemo(() => {
    if (artistData) {
      return artistData?.pages?.flatMap((s) => s?.artists || []);
    }

    return [];
  }, [JSON.stringify(artistData)]);

  return (
    <ResponsiveDrawer>
      {/* {artistListPending ? (
        <AllArtistSkeleton />
      ) : !!artistList && artistList?.length > 0 ? (
        artistList?.map((item, index) => (
          <AllArtistCard
            key={index}
            name={item?.title}
            desc={item?.description}
            img={item?.file}
            id={item?._id}
          />
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
            No artists found
          </Typography>
        </Box>
      )} */}

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
        All <span style={{ color: "rgb(255 14 188)" }}>Artists</span>
      </Typography>

      <Box sx={{ padding: "10px 5px 10px 5px" }}>
        {artistListPending ? (
          <ArtistHomeSkeleton />
        ) : (
          <Grid2 container spacing={2} justifyContent="flex-start">
            {!!artistList && artistList?.length > 0 ? (
              artistList?.map((artist, index) => (
                <Grid2 size={{ xs: 4, sm: 4, md: 3, lg: 1.5 }} key={index}>
                  <Box
                    onClick={() => router.push(`/artistsSongs/${artist?._id}`)}
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

      {/* <SongComp title="You also may" subTitle="Like" /> */}
    </ResponsiveDrawer>
  );
};

export default Artists;
