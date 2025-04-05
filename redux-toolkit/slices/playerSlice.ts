// features/audio/audioSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Song {
  src: string;
}

interface AudioState {
  playlist: string[];
  currentIndex: number;
  isPlaying: boolean;
  activeSongSource: string;
}

const initialState: AudioState = {
  playlist: [],
  currentIndex: 0,
  isPlaying: false,
  activeSongSource: "" // "recommended", "trending", etc.
};

const playerSlice = createSlice({
  name: "audio",
  initialState,
  reducers: {
    setPlaylist(state, action: PayloadAction<string[]>) {
      const newSongs = action.payload;
      const existingSet = new Set(state.playlist);
      const filteredNewSongs = newSongs.filter(
        (song) => !existingSet.has(song)
      ); // prevent duplicates
      state.playlist.push(...filteredNewSongs);
    },
    play(state) {
      state.isPlaying = true;
    },
    pause(state) {
      state.isPlaying = false;
    },
    next(state) {
      if (state.currentIndex < state.playlist.length - 1) {
        state.currentIndex += 1;
      }
    },
    prev(state) {
      if (state.currentIndex > 0) {
        state.currentIndex -= 1;
      }
    },
    setCurrentIndex(state, action: PayloadAction<number>) {
      state.currentIndex = action.payload;
    },
    setActiveSongSource: (state, action) => {
      state.activeSongSource = action.payload;
    },
  }
});

export const { setPlaylist, play, pause, next, prev, setCurrentIndex, setActiveSongSource } =
  playerSlice.actions;
export default playerSlice.reducer;
