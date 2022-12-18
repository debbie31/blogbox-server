import User from '../models/UserModel.js';
import bcrypt from 'bcryptjs';

export const getAllUser = async (req, res, next) => {
  let users;
  try {
    users = await User.find();
  } catch (error) {
    console.log(error);
  }
  if (!users) {
    return res.status(404).json({ msg: 'Users does not exist' });
  }
  return res.status(200).json({ users });
};

export const register = async (req, res, next) => {
  const { username, email, password } = req.body;
  let emailExist;
  try {
    emailExist = await User.findOne({ email });
  } catch (error) {
    console.log(error);
  }
  if (emailExist) {
    return res.status(404).json({ msg: 'Email already exist' });
  }

  let userName;
  try {
    userName = await User.findOne({ username });
  } catch (error) {
    console.log(error);
  }
  if (userName) {
    return res.status(404).json({ msg: 'Username already exist' });
  }

  const passwordHash = bcrypt.hashSync(password);

  const user = new User({
    username,
    email,
    password: passwordHash,
    blogblox: [],
  });
  try {
    await user.save();
  } catch (error) {
    console.log(error);
  }
  // return res.status(201).json({ user });
  return res.status(200).json({ msg: 'Register Successfully' });
};
export const login = async (req, res, next) => {
  const { email, password } = req.body;
  let emailExist;
  try {
    emailExist = await User.findOne({ email });
  } catch (error) {
    console.log(error);
  }
  if (!emailExist) {
    return res.status(404).json({ msg: 'Email does not exist' });
  }
  const incorrectPassword = bcrypt.compareSync(password, emailExist.password);
  if (!incorrectPassword) {
    return res.status(400).json({ msg: 'Incorrect Password' });
  }
  return res.status(200).json({ msg: 'Login Successfully', user : emailExist });
};

