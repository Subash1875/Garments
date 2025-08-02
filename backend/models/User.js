const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

//Signup
userSchema.statics.signup = async function (name, password) {
  if (!name || !password) {
    throw new Error("Username and password both are mandatory");
  }
  const existingUser = await this.findOne({ name });
  if (existingUser) {
    throw new Error("Username already taken");
  }
  try {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = await this.create({ name, password: hashedPassword });
    return user;
  } catch (err) {
    throw new Error("An error occured try again later");
  }
};

//Login
userSchema.statics.login = async function (name, password) {
  if (!name || !password) {
    throw new Error("Username and password both are mandatory");
  }
  const user = await this.findOne({ name });
  if (!user) {
    throw new Error("User not found");
  }
  const passwordCheck = await bcrypt.compare(password, user.password);
  if (!passwordCheck) {
    throw new Error("Incorrect password");
  }
  return user;
};

const Users = mongoose.model("users", userSchema);
module.exports = Users;
