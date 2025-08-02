const mongoose = require("mongoose");

const userCredentialsSchema = new mongoose.Schema({
  user: {
    type: String,
    required: true,
    unique: true,
  },
  CompanyName: {
    type: String,
    default: "",
  },
  PhoneNo: {
    type: String,
    default: "",
  },
  GstNo: {
    type: String,
    default: "",
  },
  PanNo: {
    type: String,
    default: "",
  },
  Address: {
    type: String,
    default: "",
  },
  BankName: {
    type: String,
    default: "",
  },
  Branch: {
    type: String,
    default: "",
  },
  IFSC_code: {
    type: String,
    default: "",
  },
  AccNo: {
    type: String,
    default: "",
  },
});

userCredentialsSchema.statics.AddCredentials = async function (data) {
  try {
    await this.create(data);
  } catch (err) {
    throw new Error("an error occured. please try again");
  }
};

userCredentialsSchema.statics.UpdateCredentials = async function (data) {
  const user = await this.findOne({ user: data.user });
  if (user) {
    try {
      // Create a dynamic update object
      const updateFields = {};
      for (const key in data) {
        if (
          data.hasOwnProperty(key) &&
          data[key] !== "" &&
          data[key] !== undefined
        ) {
          updateFields[key] = data[key];
        }
      }
      await this.findOneAndUpdate(
        { user: data.user },
        { $set: updateFields },
        { new: true, useFindAndModify: false }
      );
    } catch (err) {
      throw new Error("an error occurred. please try again");
    }
    return;
  } else {
    throw new Error("an error occurred. please try again");
  }
};

const userCredentials = mongoose.model(
  "usercredentials",
  userCredentialsSchema
);
module.exports = userCredentials;
