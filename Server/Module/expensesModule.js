const mongoose = require("mongoose");

const expensesData = new mongoose.Schema(
    {
        expDate: {type:Date, require},
        expItem: String,
        expVendor: String,
        expAmount: Number,
        expRemark:String,
        expUploaded:String,
        expApprovalStatus:String
    },
    {
        collection:"ExpensesData"
    }
)
let ExpensesData = mongoose.model("ExpensesData", expensesData);
module.exports = ExpensesData;
