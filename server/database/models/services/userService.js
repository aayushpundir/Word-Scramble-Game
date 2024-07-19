import User from '../User.js';

const createUser = async (username, fullName, email, password) => {
  const easyScore = '0';
  const mediumScore = '0';
  const hardScore = '0';

  try {
    const newUser = new User({
      username,
      full_name: fullName,
      email,
      password,
      easy_score: easyScore,
      medium_score: mediumScore,
      hard_score: hardScore,
    });
    const savedUser = await newUser.save();
    return savedUser;
  } catch (error) {
    throw error;
  }
};

const findUserByEmail = async (email) => {
  try {
    const user = await User.findOne({ email });
    return user;
  } catch (error) {
    throw error;
  }
};

export { createUser, findUserByEmail };
