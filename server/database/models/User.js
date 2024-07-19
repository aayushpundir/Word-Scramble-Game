import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  full_name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  easy_score: { type: String, default: '0' },
  medium_score: { type: String, default: '0' },
  hard_score: { type: String, default: '0' }
});

const User = mongoose.model('User', userSchema);

export default User;
