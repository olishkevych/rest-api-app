const { User } = require("../models/user");
const bcrypt = require("bcrypt");
const { ApiError, ctrlWrapper } = require("../helpers");

const jwt = require("jsonwebtoken");
require("dotenv".config());
const { SECRET_KEY } = process.env;

const registerUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw ApiError(409, "Email already in use");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({ ...req.body, password: hashedPassword });
  res.status(201).json({ email: newUser.email, name: newUser.name });
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw ApiError(401, "Email or password invalid");
  }
  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    throw ApiError(401, "Email or password invalid");
  }
  const payload = { id: user._id };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "8h" });
  await User.findByIdAndUpdate(user._id, { token });

  res.json({ token });
};

const getCurrentUser = async (req, res) => {
  const { email, name } = req.user;
  res.json({ email, name });
};

const logoutUser = async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: "" });

  res.json({ message: "Logged out" });
};

module.exports = {
  registerUser: ctrlWrapper(registerUser),
  loginUser: ctrlWrapper(loginUser),
  getCurrentUser: ctrlWrapper(getCurrentUser),
  logoutUser: ctrlWrapper(logoutUser),
};
