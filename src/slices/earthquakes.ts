import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getData } from "../utilities/earthquakesAPI";
import { EarthquakesStateType, FilterType } from "./earthquakes.types";

export const initialState: EarthquakesStateType = {
  items: null,
  filters: [
    {
      label: "Magnitude",
      type: "multiRange",
      matchKey: "mag",
    },
    {
      type: "select",
      matchKey: "magType",
    },

    /**
     * Filters were built to be extensible based on EarthquakePropsType
     *
     * SelectFilterType expects 'matchKey' to be a key of EarthquakePropsType where its value type is a string.
     * <SelectFilter> will collect all the strings to generate the select options.
     *
     * MultiRangeFilterType expects 'matchKey' to be a key of EarthquakePropsType where its value type is a number.
     * <MultiRangeFilter> will collect all the numbers to generate the domain range.
     *
     * Uncomment the following lines to add more filters.
     */

    // {
    //   type: "select",
    //   matchKey: 'status'
    // },
    // {
    //   type: "multiRange",
    //   matchKey: 'time'
    // }
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
      const filters = state.filters.map((filter) => {
        if (filter.matchKey === payload.matchKey) {
          return {
            ...filter,
            value: payload.value,
          } as FilterType;
        }

        return filter;
      });

      state.filters = filters;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEarthquakes.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchEarthquakes.rejected, (state, { error }) => {
        console.error("Error while fetching: ", error);

        state.status = "failed";
      })
      .addCase(fetchEarthquakes.fulfilled, (state, { payload }) => {
        state.status = "idle";

        state.items = payload;
      });
  },
});

export const { setFilterValue } = earthquakesSlice.actions;

export default earthquakesSlice.reducer;
