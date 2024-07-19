import mongoose from 'mongoose';

const easySchema = new mongoose.Schema({
  scramble_word: { type: String, required: true },
  original_word: { type: String, required: true },
  hint: { type: String, required: true }
});

const Easy = mongoose.model('Easy', easySchema);

export default Easy;