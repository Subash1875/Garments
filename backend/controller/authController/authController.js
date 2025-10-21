const jwt = require("jsonwebtoken");
const Users = require("../../models/User");
const userCredentials = require("../../models/userCredentials");
const redisClient = require("../../Redis");

//json web token
const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET_KEY);
};

const Signup = async (req, res) => {
  const { name, password } = req.body;
  if (!name || !password) {
    res.status(400).json({ msg: "Name and password both are mandatory" });
  }
  try {
    const user = await Users.signup(name, password);
    const token = createToken(user._id);
    res.status(201).json({ user: user.name, token });
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
};

const Login = async (req, res) => {
  const { name, password } = req.body;
  if (!name || !password) {
    res.status(400).json({ msg: "Name and password both are mandatory" });
  }
  try {
    const user = await Users.login(name, password);
    const token = createToken(user._id);
    res.status(202).json({ user: user.name, token });
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
};

const Logout = async (req, res) => {
  const cacheKey = `auth:${req.headers.authorization}`;
  try {
    await redisClient.del(cacheKey);
    res.status(200).json({ message: "logged out" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  Signup,
  Login,
  Logout,
};
