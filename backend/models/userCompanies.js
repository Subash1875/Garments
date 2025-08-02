const mongoose = require("mongoose");

const userCompanySchema = new mongoose.Schema({
  user: { type: String, required: true },
  company: {
    CompanyName: { type: String, default: "" },
    GstNo: { type: String, default: "" },
    PhoneNo: { type: String, default: "" },
    Address: { type: String, default: "" },
  },
});

const UserCompanies = mongoose.model("usercompany", userCompanySchema);
module.exports = UserCompanies;
