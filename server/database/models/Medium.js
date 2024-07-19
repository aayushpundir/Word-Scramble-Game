import mongoose from 'mongoose';

const mediumSchema = new mongoose.Schema({
  scramble_word: { type: String, required: true },
  original_word: { type: String, required: true },
  hint: { type: String, required: true }
});

const Medium = mongoose.model('Medium', mediumSchema);

export default Medium;