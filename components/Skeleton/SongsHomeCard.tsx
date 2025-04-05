import { Box, Grid2, Skeleton } from "@mui/material";

export const SongsHomeCard = () => {
  return (
    <Box>
      <Grid2 container spacing={2}>
        {Array.from({ length: 6 }).map((_, index) => (
          <Grid2 key={index} size={{ xs: 4, sm: 6, md: 4, lg: 2 }}>
            <Box
              sx={{
                bgcolor: "#1e1e1e",
                borderRadius: 2,
                padding: 1,
              }}
            >
              <Skeleton
                variant="rounded"
                height={140}
                sx={{ bgcolor: "grey.800", borderRadius: 2 }}
              />
              <Skeleton
                variant="text"
                height={30}
                sx={{ bgcolor: "grey.800", mt: 1 }}
              />
              <Skeleton
                variant="text"
                width="60%"
                height={20}
                sx={{ bgcolor: "grey.800" }}
              />
            </Box>
          </Grid2>
        ))}
      </Grid2>
    </Box>
  );
};
