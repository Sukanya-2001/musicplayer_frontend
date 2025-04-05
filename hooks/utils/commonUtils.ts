import { ISongsRes } from "@/api/functions/songs.api";
import { useEffect, useState } from "react";

export const getRedirectUrl = (redirect?: string): string => {
  // Get the dashboard route or fallback to login
  const userDashboard = "/dashboard";

  if (redirect) {
    return redirect;
  }

  return userDashboard;
};

export const getWindowSize = () => {
  if (typeof window === "undefined") return "lg";
  const width = window.innerWidth;
  if (width < 364) return "xxs";
  if (width < 565) return "xs";
  if (width < 600) return "sm";
  if (width < 728) return "smm";
  if (width < 1200) return "md";
  return "lg";
};

export const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState(getWindowSize());

  useEffect(() => {
    const handleResize = () => setWindowSize(getWindowSize());
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowSize;
};

export const getAudioDuration = (url: string): Promise<number> => {
  return new Promise((resolve, reject) => {
    const audio = new Audio(url);
    audio.addEventListener("loadedmetadata", () => {
      resolve(audio.duration); // duration in seconds
    });
    audio.addEventListener("error", (e) => {
      reject("Failed to load audio");
    });
  });
};

export const formatDuration = (duration: number): string => {
  const minutes = Math.floor(duration / 60);
  const seconds = Math.floor(duration % 60);
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
};

export const generatePlaylistWithMeta = async (songs: ISongsRes[]) => {
  const playlist = await Promise.all(
    songs.map(async (song) => {
      const durationInSeconds = await getAudioDuration(song.audioFile);

      return {
        src: song.audioFile,
        title: song.title,
        image: song.imageFile,
        artist: song.selectArtist?.map((a) => a.title).join(", "),
        duration: formatDuration(durationInSeconds)
      };
    })
  );

  return playlist;
};
