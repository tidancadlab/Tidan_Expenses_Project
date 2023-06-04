const { createSlice } = require("@reduxjs/toolkit");

const initialState = [];

const tranData = createSlice({
  name: "allTran",
  initialState: [],
  reducers: {
    getTran(state, action) {
      return action.payload;
    },
  },
});

export const { getTran } = tranData.actions;
export default tranData.reducer;
