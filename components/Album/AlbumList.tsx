import { Album, useGetAlbumHook } from "@/api/functions/album.api";
import CustomButtonPrimary from "@/ui/CustomButtons/CustomButtonPrimary";
import { Box, CircularProgress, Grid, Typography } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/router";
import { useMemo } from "react";
import { AllAlbumSkeleton } from "./AllAlbumSkeleton";

type AlbumProps = {
  title: string;
  subTitle: string;
};
export const AlbumList = ({ title, subTitle }: AlbumProps) => {
  const router = useRouter();
  const {
    data: albumData,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage
  } = useGetAlbumHook();

  const albumList: Album[] = useMemo(() => {
    if (albumData) {
      return albumData?.pages?.flatMap((s) => s?.albums || []);
    }

    return [];
  }, [JSON.stringify(albumData)]);

  return (
    <Box>
      {/* Title */}
      <Typography
        variant="body1"
        fontWeight="bold"
        sx={{ fontSize: "25px", padding: "20px 30px" }}
      >
        {title}{" "}
        <Box component="span" color="rgb(255 14 188)">
          {subTitle}
        </Box>
      </Typography>

      {/* Albums Grid */}
      {isLoading ? (
        <AllAlbumSkeleton />
      ) : (
        <Grid container spacing={2} justifyContent="flex-start">
          {!!albumList && albumList?.length > 0 ? (
            albumList?.map((item, index) => (
              <Grid
                item
                xs={6}
                sm={4}
                md={3}
                lg={2}
                key={index}
                sx={{ cursor: "pointer" }}
                onClick={() => router.push(`albumSongs/${item?._id}`)}
              >
                <Box textAlign="center" sx={{ padding: "10px" }}>
                  {/* Album Image */}
                  <Image
                    src={item?.file}
                    width={180}
                    height={220}
                    alt={item?.title}
                    style={{ borderRadius: "10px", height: "220px"}}
                  />

                  {/* Album Title */}
                  <Typography
                    variant="body1"
                    fontWeight="bold"
                    sx={{
                      mt: 1,
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      maxWidth: "180px"
                    }}
                  >
                    {item?.title}
                  </Typography>
                </Box>
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
                No albums found
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
        </Grid>
      )}
    </Box>
  );
};
