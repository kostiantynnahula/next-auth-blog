import { Schema, model, models } from 'mongoose';

const userSchema = new Schema({
  name: {
    type: String,
    unique: true,
    require: true,
  },
  email: {
    type: String,
    unique: true,
    require: true,
  },
  password: {
    type: String,
    require: true,
  }
}, { timestamps: true });

export default models.User ||  model('User', userSchema);