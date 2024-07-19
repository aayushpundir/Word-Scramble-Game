import mongoose from 'mongoose';

const hardSchema = new mongoose.Schema({
  scramble_word: { type: String, required: true },
  original_word: { type: String, required: true },
  hint: { type: String, required: true }
});

const Hard = mongoose.model('Hard', hardSchema);

export default Hard;