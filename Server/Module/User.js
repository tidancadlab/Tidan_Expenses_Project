const mongoose = require("mongoose");

const UserDetailsScehma = new mongoose.Schema(
  {
    userName: {type:String, require},
    userEmail: { type: String, unique: true },
    password: String,
    time : { type: Number, default: (new Date()).getTime() }
  },
  {
    collection: "UserInfo",
  }
);

let userData  = mongoose.model("UserInfo", UserDetailsScehma);
module.exports = userData;

