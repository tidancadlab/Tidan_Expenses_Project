const { createSlice } = require("@reduxjs/toolkit");

const initialState = [];

const ref = createSlice({
  name: "refresh",
  initialState: [],
  reducers: {
    refresh(state, action) {
      return action.payload;
    },
  },
});

export const { refresh } = ref.actions;
export default ref.reducer;
