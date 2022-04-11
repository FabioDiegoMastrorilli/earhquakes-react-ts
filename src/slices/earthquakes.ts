import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getData } from '../features/counter/earthquakesAPI';
import { EarthquakePropsKeys, EarthquakesState, FilterValue, RemoteFilters } from './earthquakes.types';

const initialState: EarthquakesState = {
  items: null,
  filters: {
    local: {},
    remote: {}
  },
  page: 0,
  status: 'idle',
};

export const fetchEarthquakes = createAsyncThunk(
  'earthquakes/fetchEarthquakes',
  async ({filters, page}: {
    filters: RemoteFilters,
    page: number
  }) => {
    return await getData(filters, page);
  }
);

type SetFilterPayloadType = {
  name: EarthquakePropsKeys, value: FilterValue, type: 'local'
} | {
  name: string, value: FilterValue, type: 'remote'
}

export const earthquakesSlice = createSlice({
  name: 'earthquakes',
  initialState,
  reducers: {
    setFilter: (state, {payload: {name, value, type}}: PayloadAction<SetFilterPayloadType>) => {
      const updatedFilters = {
          ...state.filters[type],
          [name]: value
      }

      return {
        ...state,
        filters: {
          ...state.filters,
          [type]: updatedFilters
        }
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEarthquakes.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchEarthquakes.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(fetchEarthquakes.fulfilled, (state, action) => {
        state.status = 'idle';
        
        state.items = action.payload;
      })
  },
});

export const {setFilter} = earthquakesSlice.actions

export default earthquakesSlice.reducer;
