import { Schema, model, models } from 'mongoose';

const postSchema = new Schema({
  title: {
    type: String,
    require: true,
  },
  desc: {
    type: String,
    require: true,
  },
  image: {
    type: String,
    require: true,
  },
  content: {
    type: String,
    require: true,
  },
  username: {
    type: String,
    require: true,
  }
}, { timestamps: true });

export default models.Post || model('Post', postSchema);