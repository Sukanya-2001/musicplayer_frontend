import { AlbumListData } from "@/lib/static/Demo";
import { Box, Grid, Typography } from "@mui/material";
import Image from "next/image";
import { SongProps } from "../SongComp/SongComp";

export const AlbumList = ({ title, subTitle }: SongProps) => {
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
      <Grid container spacing={2} justifyContent="center">
        {AlbumListData.map((item, index) => (
          <Grid item xs={4} sm={4} md={3} lg={2} key={index}>
            <Box textAlign="center" sx={{ padding: "10px" }}>
              {/* Album Image */}
              <Image
                src={item?.img}
                width={180}
                height={250}
                alt={item?.title}
                style={{ borderRadius: "10px" }}
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

              {/* Album Subtitle */}
              <Typography
                variant="body2"
                color="gray"
                sx={{
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  maxWidth: "180px"
                }}
              >
                {item?.subtitle}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};
