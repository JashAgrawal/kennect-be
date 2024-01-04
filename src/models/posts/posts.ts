import mongoose from 'mongoose';
import Auth from '../Auth/Auth';
import comments from '../comments/comments';

const posts = new mongoose.Schema(
  {
    text: {
      type: String,
      index: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: Auth,
    },
  },
  { timestamps: true },
);
posts.index({ text: 'text' });
export default mongoose.model('posts', posts);
