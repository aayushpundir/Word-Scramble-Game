import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Easy from './Easy.js'; // Ensure the path is correct
import Medium from './Medium.js';
import Hard from './Hard.js';
import fs from 'fs/promises'; // Using fs promises API to read JSON files

dotenv.config(); // Load environment variables

const MONGODB_URI ="mongodb+srv://ishitaandaayush:Ayush%40123@wordscramble.dbjwvfs.mongodb.net/?retryWrites=true&w=majority&appName=WordScramble";

if (!MONGODB_URI) {
  console.error('MONGODB_URI is not defined in .env file');
  process.exit(1);
}

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 30000, // Increase timeout to 30 seconds
  socketTimeoutMS: 30000, // Increase socket timeout to 30 seconds
});

mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
  console.error('Error connecting to MongoDB:', err);
  process.exit(1);
});

// Function to read JSON file
const readJSONFile = async (filePath) => {
  try {
    const data = await fs.readFile(filePath, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    console.error('Error reading JSON file:', err);
    return [];
  }
};

// Insert data function
const insertData = async (Model, jsonFilePath) => {
  try {
    const data = await readJSONFile(jsonFilePath);
    await Model.insertMany(data);
    console.log(`Inserted data into ${Model.collection.name}`);
  } catch (err) {
    console.error(`Error inserting data into ${Model.collection.name}:`, err);
  }
};

// Call insertData for each collection
(async () => {
  // await insertData(Easy, './easy.json');
  // await insertData(Medium, './medium.json');
  await insertData(Hard, './hard.json');

  // Disconnect Mongoose connection after insertion
  mongoose.disconnect();
})();
