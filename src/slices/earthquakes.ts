import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getData } from "../utilities/earthquakesAPI";
import { EarthquakesStateType, FilterType } from "./earthquakes.types";

export const initialState: EarthquakesStateType = {
  items: null,
  filters: [
    {
      type: "multiRange",
      matchKey: "mag",
    },
    {
      type: "select",
      matchKey: "magType",
    },
  ],
  status: "idle",
};

export const fetchEarthquakes = createAsyncThunk(
  "earthquakes/fetchEarthquakes",
  getData
);

export const earthquakesSlice = createSlice({
  name: "earthquakes",
  initialState,
  reducers: {
    setFilterValue: (state, { payload }: PayloadAction<FilterType>) => {
      const filters = state.filters.map((filter) => ({
        ...filter,
        value:
          filter.matchKey === payload.matchKey ? payload.value : filter.value,
      })) as FilterType[];

      return {
        ...state,
        filters,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEarthquakes.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchEarthquakes.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(fetchEarthquakes.fulfilled, (state, action) => {
        state.status = "idle";

        state.items = action.payload;
      });
  },
});

export const { setFilterValue } = earthquakesSlice.actions;

export default earthquakesSlice.reducer;
