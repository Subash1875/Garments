const jwt = require("jsonwebtoken");
const User = require("../models/User");

const requireAuth = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({ msg: "User must be logged in" });
  }
  try {
    const decoded = jwt.verify(authorization, process.env.SECRET_KEY);
    const user = await User.findOne({ _id: decoded._id });
    if (!user) {
      return res.status(401).json({ msg: "User must be logged in" });
    }
    req.user = user.name;
    next();
  } catch (err) {
    return res.status(401).json({ msg: "an error occured. please try again" });
  }
};

module.exports = requireAuth;
