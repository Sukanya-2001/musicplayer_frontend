import globalSlice from "./global.slice";
import playerSlice from "./playerSlice";
import userSlice from "./userSlice";

const rootReducer = {
  userSlice,
  globalSlice,
  audio: playerSlice
};

export default rootReducer;
