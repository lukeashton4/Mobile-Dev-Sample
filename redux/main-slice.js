import {
  createEntityAdapter,
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";
import { post } from "axios";

const sampleQuery = "account { data { title, updatedAt } } }";

const sampleDataAdapter = createEntityAdapter();

const fetchSampleData = createAsyncThunk("sample/fetchData", async () => {
  const response = await post("/graphql", {
    query: sampleQuery,
  });
  const data = response.data.account.data;

  return data;
});

const sampleDataSlice = createSlice({
  name: "sample",
  initialState: {
    sampleData: sampleDataAdapter.getInitialState(),
    loading: "idle",
  },
  reducers: {},
  extraReducers: {
    [fetchSampleData.fulfilled]: (state, action) => {
      sampleDataAdapter.setAll(state.sampleData, action.payload);
    },
  },
});

export { fetchSampleData };

export const sampleDataSelectors = sampleDataAdapter.getSelectors(
  (state) => state.sampleDataReducer.sampleData
);

export default sampleDataSlice.reducer;
