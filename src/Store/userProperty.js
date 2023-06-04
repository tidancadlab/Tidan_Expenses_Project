const { createSlice } = require("@reduxjs/toolkit");

const userPro = createSlice({
  name: "user",
  initialState: [],
  reducers: {
    userProperty(state, action) {
      return action.payload;
    },
  },
});

export const { userProperty } = userPro.actions;
export default userPro.reducer;
