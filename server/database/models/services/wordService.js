import Easy from '../Easy.js';
import Medium from '../Medium.js';
import Hard from '../Hard.js';

const getRandomWord = async (Model) => {
  try {
    const words = await Model.aggregate([{ $sample: { size: 1 } }]);
    return words[0];
  } catch (error) {
    throw error;
  }
};

const createEasyWord = async (scrambleWord, originalWord, hint) => {
  try {
    const newEasyWord = new Easy({
      scramble_word: scrambleWord,
      original_word: originalWord,
      hint,
    });
    const savedEasyWord = await newEasyWord.save();
    return savedEasyWord;
  } catch (error) {
    throw error;
  }
};

const createMediumWord = async (scrambleWord, originalWord, hint) => {
  try {
    const newMediumWord = new Medium({
      scramble_word: scrambleWord,
      original_word: originalWord,
      hint,
    });
    const savedMediumWord = await newMediumWord.save();
    return savedMediumWord;
  } catch (error) {
    throw error;
  }
};

const createHardWord = async (scrambleWord, originalWord, hint) => {
  try {
    const newHardWord = new Hard({
      scramble_word: scrambleWord,
      original_word: originalWord,
      hint,
    });
    const savedHardWord = await newHardWord.save();
    return savedHardWord;
  } catch (error) {
    throw error;
  }
};

export { getRandomWord, createEasyWord, createMediumWord, createHardWord };