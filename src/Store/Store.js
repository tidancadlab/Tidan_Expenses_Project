import { configureStore } from "@reduxjs/toolkit";
import ref from "./refreshData";
import getTran from "./TranStore";
import user from "./user";
import userProperty from "./userProperty";
const store = configureStore({
  reducer: {
    tran: getTran,
    refresh: ref,
    user: user,
    userProperty: userProperty,
  },
});

export default store;
