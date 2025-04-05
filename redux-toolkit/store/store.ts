import { combineReducers, configureStore } from "@reduxjs/toolkit";
import rootReducer from "../slices/rootReducer";

// Combine all your slice reducers
const combinedReducer = combineReducers(rootReducer);

// Configure the store without persistence
export const store = configureStore({
  reducer: combinedReducer,
  devTools: process.env.NODE_ENV === "development"
});

// Infer the `ReduxRootState` and `ReduxAppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
