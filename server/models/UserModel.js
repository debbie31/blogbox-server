import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    blogblox: [{ type: mongoose.Types.ObjectId, ref: 'Posts', required: true }],
  },
  { timestamps: true }
);

export default model('Users', userSchema);
