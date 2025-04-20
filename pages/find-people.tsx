import { People, useGetAllUserHook } from "@/api/functions/songByUser.api";
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

const FindPeople = () => {
  const router = useRouter();
  const {
    data: peopleData,
    isLoading: peopleListPending,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage
  } = useGetAllUserHook();

  const peopleList: People[] = useMemo(() => {
    if (peopleData) {
      return peopleData?.pages?.flatMap((s) => s?.exploreSongs || []);
    }

    return [];
  }, [JSON.stringify(peopleData)]);

  return (
    <ResponsiveDrawer>
      {/* <Typography
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
      </Typography> */}

      <Box sx={{ padding: "20px 5px 10px 5px" }}>
        {peopleListPending ? (
          <ArtistHomeSkeleton />
        ) : (
          <Grid2 container spacing={2} justifyContent="flex-start">
            {!!peopleList && peopleList?.length > 0 ? (
              peopleList?.map((item, index) => (
                <Grid2 size={{ xs: 4, sm: 4, md: 3, lg: 1.5 }} key={index}>
                  <Box
                    onClick={() =>
                      router.push(`/artistsSongs/${item?.userId?._id}`)
                    }
                    sx={{ cursor: "pointer" }}
                  >
                    <Avatar
                      src={!!item?.file ? item?.file : assest?.userImage}
                      sx={{ width: 100, height: 100, margin: "auto" }}
                    />
                    <Typography
                      variant="body2"
                      sx={{ marginTop: 1, color: "white", textAlign: "center" }}
                    >
                      {item?.userId?.name}
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
                  No people found
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
    </ResponsiveDrawer>
  );
};

export default FindPeople;
