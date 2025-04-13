// wishlistSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type WishListItem = {
  _id: string;
  song: string;
};

type WishlistState = {
  wishListIds: WishListItem[];
};

const initialState: WishlistState = {
  wishListIds: [],
};

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    setWishList: (state, action: PayloadAction<WishListItem[]>) => {
      state.wishListIds = action.payload;
    },
  },
});

export const { setWishList } = wishlistSlice.actions;
export default wishlistSlice.reducer;
