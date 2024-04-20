import { createSlice } from "@reduxjs/toolkit";
import { initialState } from "./initialState";

const testSlice = createSlice({
  name: "test",
  initialState,
  reducers: {
    quizCount(state, action) {
      state.test = action.payload;
    },
  },
});
export const { quizCount } = testSlice.actions;
export default testSlice.reducer;
