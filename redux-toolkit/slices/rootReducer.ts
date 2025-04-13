import globalSlice from "./global.slice";
import playerSlice from "./playerSlice";
import userSlice from "./userSlice";
import wishlistReducer from "./wishlistSlice";

const rootReducer = {
  userSlice,
  globalSlice,
  audio: playerSlice,
  wishlist: wishlistReducer
};

export default rootReducer;
