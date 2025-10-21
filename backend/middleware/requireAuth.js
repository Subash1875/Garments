const jwt = require("jsonwebtoken");
const User = require("../models/User");
const redisClient = require("../Redis");

const requireAuth = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({ msg: "User must be logged in" });
  }
  try {
    const decoded = jwt.verify(authorization, process.env.SECRET_KEY);

    const cacheKey = `auth:${decoded._id}`;

    const cacheData = await redisClient.get(cacheKey);

    if (cacheData) {
      const { _id, username } = JSON.parse(cacheData);
      req.user = username;
      return next();
    }

    const user = await User.findOne({ _id: decoded._id });
    if (!user) {
      return res.status(401).json({ msg: "User must be logged in" });
    }

    const minUser = { _id: user._id, username: user.name };
    await redisClient.setEx(cacheKey, 3600, JSON.stringify(minUser));

    req.user = user.name;
    next();
  } catch (err) {
    return res.status(401).json({ msg: "an error occured. please try again" });
  }
};

module.exports = requireAuth;
