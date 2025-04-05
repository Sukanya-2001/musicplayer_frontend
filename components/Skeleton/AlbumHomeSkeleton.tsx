import { Box, Grid2, Skeleton } from "@mui/material";

export const AlbumHomeSkeleton = () => {
  return (
    <Box>
      <Grid2 container spacing={2}>
        {Array.from({ length: 6 }).map((_, index) => (
          <Grid2 key={index} size={{ xs: 6, sm: 6, md: 3, lg: 2 }}>
            <Box
              sx={{
                bgcolor: "#1e1e1e",
                borderRadius: 2,
                padding: 2,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center"
              }}
            >
              <Skeleton
                variant="circular"
                width={110}
                height={110}
                sx={{ bgcolor: "grey.800" }}
              />
              <Skeleton
                variant="text"
                width={120}
                height={30}
                sx={{ bgcolor: "grey.800" }}
              />
              <Skeleton
                variant="text"
                width={60}
                height={30}
                sx={{ bgcolor: "grey.800" }}
              />
            </Box>
          </Grid2>
        ))}
      </Grid2>
    </Box>
  );
};
