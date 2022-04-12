import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import earthquakesReducer from "../slices/earthquakes";

export const store = configureStore({
  reducer: {
    earthquakes: earthquakesReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
