const { createSlice } = require("@reduxjs/toolkit");

const initialState = [];

const user = createSlice({
  name: "user",
  initialState: [],
  reducers: {
    loggedUser(state, action) {
      return action.payload;
    },
    allUser(state, action) {
      return action.payload;
    },
  },
});

export const { loggedUser, allUser } = user.actions;
export default user.reducer;
