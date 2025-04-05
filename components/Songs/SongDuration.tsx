import { formatDuration, getAudioDuration } from "@/hooks/utils/commonUtils";
import { Skeleton, Typography } from "@mui/material";
import { useEffect, useState } from "react";

export const SongDuration = ({ audioUrl }: { audioUrl: string }) => {
  const [duration, setDuration] = useState<string>("");

  useEffect(() => {
    if (!audioUrl) return;

    getAudioDuration(audioUrl)
      .then((d) => setDuration(formatDuration(d)))
      .catch(() => setDuration("0:00"));
  }, [audioUrl]);

  return (
    <Typography variant="body2" sx={{ mr: 1 }} color="white">
      {duration || <Skeleton width={60} variant="rounded" animation="wave" sx={{ bgcolor: "grey.800" }} />}
    </Typography>
  );
};
