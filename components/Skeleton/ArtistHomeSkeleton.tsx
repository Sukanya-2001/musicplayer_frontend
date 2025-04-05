import { Box, Grid2, Skeleton } from "@mui/material";

export const ArtistHomeSkeleton = () => {
  return (
    <Box>
      <Grid2 container spacing={2}>
        {Array.from({ length: 8 }).map((_, index) => (
          <Grid2 key={index} size={{ xs: 4, sm: 4, md: 3, lg: 1.5 }}>
            <Skeleton
              variant="circular"
              width={110}
              height={110}
              sx={{ bgcolor: "grey.800" }}
            />
          </Grid2>
        ))}
      </Grid2>
    </Box>
  );
};
