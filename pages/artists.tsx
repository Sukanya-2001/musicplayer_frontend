import { Artist, useGetAllArtistHook } from "@/api/functions/artist.api";
import { AllArtistCard } from "@/components/Artists/AllArtistCard";
import { AllArtistSkeleton } from "@/components/Artists/AllArtistSkeleton";
import ResponsiveDrawer from "@/components/ResponsiveDrawer/ResponsiveDrawer";
import CustomButtonPrimary from "@/ui/CustomButtons/CustomButtonPrimary";
import { Box, CircularProgress, Typography } from "@mui/material";
import { useMemo } from "react";

const Artists = () => {
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
      {artistListPending ? (
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

      {/* <SongComp title="You also may" subTitle="Like" /> */}
    </ResponsiveDrawer>
  );
};

export default Artists;
