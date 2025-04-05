// features/audio/audioSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Song {
  src: string;
  title: string;
  image: string;
  artist: string;
  duration: string;
}

interface AudioState {
  playlist: Song[];
  currentIndex: number;
  isPlaying: boolean;
  activeSongSource: string;
}

const initialState: AudioState = {
  playlist: [],
  currentIndex: 0,
  isPlaying: false,
  activeSongSource: ""
};

const playerSlice = createSlice({
  name: "audio",
  initialState,
  reducers: {
    setPlaylist(state, action: PayloadAction<Song[]>) {
      const newSongs = action.payload;
      const existingSrcSet = new Set(state.playlist.map((s) => s.src));
      const filteredNewSongs = newSongs.filter(
        (song) => !existingSrcSet.has(song.src)
      );
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
    setActiveSongSource(state, action: PayloadAction<string>) {
      state.activeSongSource = action.payload;
    }
  }
});

export const {
  setPlaylist,
  play,
  pause,
  next,
  prev,
  setCurrentIndex,
  setActiveSongSource
} = playerSlice.actions;
export default playerSlice.reducer;
