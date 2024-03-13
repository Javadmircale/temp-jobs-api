const { BadRequestError, UnauthenticatedError } = require("../errors");
const { StatusCodes } = require("http-status-codes");
const User = require("../models/User");
const register = async (req, res) => {
  const user = await User.create({ ...req.body });
  const token = await user.createJWT();
  res.status(StatusCodes.OK).json({ user: { name: user.name }, token });
};
const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new BadRequestError("Please provide email and password");
  }
  const user = await User.findOne({ email });
  const isValid = user.comparePassword(password);
  if (!isValid) {
    throw new UnauthenticatedError("Invalid password");
  }
  const token = await user.createJWT();
  res.status(StatusCodes.OK).json({ user: { name: user.name }, token });
};

module.exports = { login, register };
