import mongoose from 'mongoose';
import Auth from '../Auth/Auth';
import posts from '../posts/posts';

const comments = new mongoose.Schema(
  {
    text: {
      type: String,
      index: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: Auth,
    },
    postId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: posts,
    },
  },
  { timestamps: true },
);
comments.index({ text: 'text' });
export default mongoose.model('comments', comments);
