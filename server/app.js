import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import db from "./database/db.js";
import { findUserByEmail, createUser } from './database/models/services/userService.js';
import { getRandomWord, createEasyWord, createMediumWord, createHardWord } from './database/models/services/wordService.js';
import Easy from './database/models/Easy.js';
import Medium from './database/models/Medium.js';
import Hard from './database/models/Hard.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/register', async (req, res) => {
  let { name, aliasName, email, password } = req.body; 

  const aliasNames = [
    'Tomcockle Weathercock', 
    'Flaccid Noodle', 
    'Bootleg Edgelord', 
    'Baked Lasagna', 
    'Sweltering Bushmeat',
  ];

  try {
    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    if (aliasName == '') {
      const randomIndex = Math.floor(Math.random() * aliasNames.length);
      aliasName = aliasNames[randomIndex];
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await createUser(name, aliasName, email, hashedPassword); 
    res.status(201).json(newUser);
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await findUserByEmail(email);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Incorrect password' });
    }

    const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    res.status(200).json({ token });
  } catch (error) {
    console.error('Error logging in user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.get('/easylevel', async (req, res) => {
  try {
    const wordData = await getRandomWord(Easy);
    res.json(wordData);
  } catch (error) {
    console.error('Error retrieving easy word:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.post('/easylevel', async (req, res) => {
  const { email, highScore } = req.body;
  try {
    const user = await findUserByEmail(email);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.easy_score = highScore;
    await user.save();
    res.status(200).json(user);
  } catch (error) {
    console.error('Error updating high score:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.post('/easylevelhighscore', async (req, res) => {
  const { email } = req.body;
  try {
    const user = await findUserByEmail(email);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ easy_score: user.easy_score, full_name: user.full_name });
  } catch (error) {
    console.log('Error retrieving the word', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.get('/mediumlevel', async (req, res) => {
  try {
    const wordData = await getRandomWord(Medium);
    res.json(wordData);
  } catch (error) {
    console.error('Error retrieving medium word:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.post('/mediumlevelhighscore', async (req, res) => {
  const { email } = req.body;
  try {
    const user = await findUserByEmail(email);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ medium_score: user.medium_score, full_name: user.full_name });
  } catch (error) {
    console.log('Error retrieving the word', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.post('/mediumlevel', async (req, res) => {
  const { email, highScore } = req.body;
  try {
    const user = await findUserByEmail(email);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.medium_score = highScore;
    await user.save();
    res.status(200).json(user);
  } catch (error) {
    console.error('Error updating high score:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.get('/hardlevel', async (req, res) => {
  try {
    const wordData = await getRandomWord(Hard);
    res.json(wordData);
  } catch (error) {
    console.error('Error retrieving hard word:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.post('/hardlevelhighscore', async (req, res) => {
  const { email } = req.body;
  try {
    const user = await findUserByEmail(email);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ hard_score: user.hard_score, full_name: user.full_name });
  } catch (error) {
    console.log('Error retrieving the word', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.post('/hardlevel', async (req, res) => {
  const { email, highScore } = req.body;
  try {
    const user = await findUserByEmail(email);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.hard_score = highScore;
    await user.save();
    res.status(200).json(user);
  } catch (error) {
    console.error('Error updating high score:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
