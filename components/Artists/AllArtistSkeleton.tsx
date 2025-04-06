import { Box, Skeleton } from "@mui/material";

export const AllArtistSkeleton = () => {
  return (
    <Box>
      {Array.from({ length: 3 }).map((_, index) => (
        <Skeleton
          key={index}
          height={350}
          variant="rounded"
          sx={{ bgcolor: "grey.800", margin: "20px" }}
        />
      ))}
    </Box>
  );
};
