import {
  GenreSongs,
  useGetDiscoverSongsHook
} from "@/api/functions/discover.api";
import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useMemo } from "react";
import { SongSection } from "../Skeleton/SongSection";
import { DiscoverSongSec } from "./DiscoverSongSec";

const DiscoverSongList: React.FC = () => {
  const { data: songsData, isLoading } = useGetDiscoverSongsHook();

  const songList: GenreSongs[] = useMemo(() => {
    if (songsData) {
      return songsData?.pages?.flatMap((s) => s?.data || []);
    }

    return [];
  }, [JSON.stringify(songsData)]);

  console.log(songList);

  return isLoading ? (
    <SongSection />
  ) : !!songList && songList?.length > 0 ? (
    songList?.map((item, index) => (
      <DiscoverSongSec key={index} type={item?.genre} songs={item?.songs} />
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
        No songs found
      </Typography>
    </Box>
  );
};

export default DiscoverSongList;
