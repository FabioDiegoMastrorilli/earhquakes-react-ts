import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getData } from "../utilities/earthquakesAPI";
import { EarthquakesState, Filter } from "./earthquakes.types";

const initialState: EarthquakesState = {
  earthquakes: null,
  filters: [
    {
      type: "multiRange",
      matchKey: "mag",
    },
    {
      type: "multiRange",
      matchKey: "time",
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
    setFilterValue: (state, { payload }: PayloadAction<Filter>) => {
      const filters = state.filters.map((filter) => ({
        ...filter,
        value:
          filter.matchKey === payload.matchKey ? payload.value : filter.value,
      })) as Filter[];

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

        state.earthquakes = action.payload;
      });
  },
});

export const { setFilterValue } = earthquakesSlice.actions;

export default earthquakesSlice.reducer;
