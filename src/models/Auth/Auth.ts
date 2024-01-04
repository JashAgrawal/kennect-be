import mongoose from 'mongoose';

const User = new mongoose.Schema(
  {
    Name: {
      type: String,
      required: [true, 'Please enter a full name'],
      index: true,
    },

    Email: {
      type: String,
      lowercase: true,
      unique: true,
      index: true,
    },
    Password: String,
  },
  { timestamps: true },
);

export default mongoose.model('User', User);
