import mongoose from 'mongoose';
import Post from '../models/PostModel.js';
import User from '../models/UserModel.js';

export const getAllPost = async (req, res) => {
  let posts;
  try {
    posts = await Post.find().populate('user');
  } catch (error) {
    return console.log(error);
  }
  if (!posts) {
    return res.status(404).json({ msg: 'Post does not Exist' });
  }
  return res.status(200).json({ posts });
};

export const createPost = async (req, res) => {
  const { title, description, image, user } = req.body;

  let userExist;
  try {
    userExist = await User.findById(user);
  } catch (error) {
    return console.log(error);
  }
  if (!userExist) {
    return res.status(404).json({ msg: 'User does not exist' });
  }
  const post = new Post({
    title,
    description,
    image,
    user,
  });
  try {
    const session = await mongoose.startSession();
    session.startTransaction();
    await post.save({ session });
    userExist.blogblox.push(post);
    await userExist.save({ session });
    await session.commitTransaction();
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: error });
  }
  return res.status(200).json({ post });
};

export const updatePost = async (req, res) => {
  const { title, description } = req.body;
  const postId = req.params.id;
  let post;
  try {
    post = await Post.findByIdAndUpdate(postId, {
      title,
      description,
    });
  } catch (error) {
    return console.log(error);
  }
  if (!post) {
    return res.status(500).json({ msg: 'Cannot update post' });
  }
  return res.status(200).json({ post });
};

export const getIdPost = async (req, res) => {
  const id = req.params.id;
  let post;
  try {
    post = await Post.findById(id);
  } catch (error) {
    return console.log(error);
  }
  if (!post) {
    return res.status(404).json({ msg: 'No post found' });
  }
  return res.status(200).json({ post });
};

export const deletePost = async (req, res) => {
  const id = req.params.id;
  let post;
  try {
    post = await Post.findByIdAndRemove(id);
  } catch (error) {
    return console.log(error);
  }
  if (!post) {
    return res.status(200).json({ msg: 'Cannot delete post' });
  }
  return res.status(200).json({ msg: 'Successfully deleted' });
};

