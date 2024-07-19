import React, { useState, useEffect, useRef, useContext } from 'react';
import { AuthContext } from '../AuthContext';
import useSound from 'use-sound';
import axios from 'axios';
import { Box, Center, Heading, Input, Button, Text, VStack, HStack } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const EasyLevelPage = () => {
  const [scrambledWord, setScrambledWord] = useState('');
  const [originalWord, setOriginalWord] = useState('');
  const [hint, setHint] = useState('');
  const [name, setName] = useState('');
  const [userInput, setUserInput] = useState('');
  const [timer, setTimer] = useState(60); 
  const [currentScore, setCurrentScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [isUserLoaded, setIsUserLoaded] = useState(false);
  const navigate = useNavigate();
  const intervalRef = useRef(null);
  const [playCorrectSound] = useSound('./audios/correct.mp3'); 
  const [playWrongSound] = useSound('./audios/wrong.mp3');
  const [playGameOverSound] = useSound('./audios/gameover.mp3');
  const { user } = useContext(AuthContext);
  const [email, setEmail] = useState('');

  useEffect(() => {
    if (user === null) {
      navigate('/login');
    } else {
      setEmail(user.email);
      setIsUserLoaded(true); 
    }
  }, [user, navigate]);

  useEffect(() => {
    if (isUserLoaded) {
      fetchHighScore();
      fetchEasyWord();
    }
  }, [isUserLoaded]);

  useEffect(() => {
    if (timer === 0) {
      playGameOverSound();
      if (currentScore > highScore) {
        setHighScore(currentScore);
        postHighScore();
      }
      handleGameOver();
    }
  }, [timer]);

  const fetchHighScore = async () => {
    try {
      const response = await axios.post('https://word-scramble-game-server.onrender.com/easylevelhighscore', { email });
      const { easy_score, full_name } = response.data;
      setName(full_name);
      setHighScore(easy_score);
    } catch (error) {
      console.error('Error fetching high score:', error);
    }
  };

  const postHighScore = async () => {
    try {
      const response = await axios.post('https://word-scramble-game-server.onrender.com/easylevel', { email, highScore: currentScore });
      if (response.status === 200) {
        console.log('Data send successful');
      } else {
        console.error('Failed:', response.data);
      }
    } catch (error) {
      console.error('Error sending the data:', error);
    }
  };

  const fetchEasyWord = async () => {
    try {
      const response = await axios.get('https://word-scramble-game-server.onrender.com/easylevel');
      const { scramble_word, original_word, hint } = response.data;
      setScrambledWord(scramble_word);
      setOriginalWord(original_word);
      setHint(hint);
      startTimer();
    } catch (error) {
      console.error('Error fetching easy word:', error);
    }
  };

  const startTimer = () => {
    clearInterval(intervalRef.current);
    setTimer(60); 

    const intervalId = setInterval(() => {
      setTimer((prevTimer) => prevTimer - 1);
    }, 1000);

    intervalRef.current = intervalId;
  };

  const handleInputChange = (event) => {
    setUserInput(event.target.value);
  };

  const handleSubmit = () => {
    if (userInput.toLowerCase() === originalWord.toLowerCase()) {
      handleCorrectAnswer();
    } else {
      handleWrongAnswer();
    }
  };

  const handleCorrectAnswer = () => {
    playCorrectSound();
    let points = 0;
    const remainingTime = 60 - timer;
    if (remainingTime <= 10) {
      points = 10;
    } else if (remainingTime <= 20) {
      points = 7;
    } else if (remainingTime <= 40) {
      points = 4;
    } else {
      points = 2;
    }
    setCurrentScore((prevScore) => prevScore + points);
    setUserInput('');
    fetchEasyWord(); 
  };

  const handleWrongAnswer = () => {
    playWrongSound();
    setUserInput('');
  };

  const handleGameOver = () => {
    setGameOver(true);
    clearInterval(intervalRef.current);
  };

  return (
    <Box
      className='easylevel'
      bg="rgba(255, 255, 255, 0.5)"
      p={8}
      borderRadius="md"
      boxShadow="0px 4px 12px rgba(0, 0, 0, 0.1)"
      maxW="md"
      borderWidth="1px"
      overflow="hidden"
      mx="auto"
      border="1px"
      mt={0}
      w="50vw"
    >
      <Center>
        <VStack spacing={8} align="center">
          <Heading as="h1" size="xl">
            Easy Level
          </Heading>
          <Text fontSize="2xl">Current Player: {name}</Text>
          <Box p={8} borderRadius="md" boxShadow="md" maxW="xl" borderWidth="1px">
            <Text fontSize="2xl">Scrambled Word: {scrambledWord}</Text>
            <Text fontSize="lg" color="gray.600">
              Hint: {hint}
            </Text>
            <Input
              variant="filled"
              size="lg"
              placeholder="Enter your answer"
              value={userInput}
              onChange={handleInputChange}
              mt={4}
            />
            <Button colorScheme="blue" size="lg" mr={15} onClick={handleSubmit} mt={4}>
              Submit
            </Button>
            { gameOver && (
              <Button colorScheme="red" size="lg" onClick={() => navigate('/level')} mt={4}>
                Try Again
              </Button> 
            )}
          </Box>
          <HStack spacing={4} mt={8}>
            <Text fontSize="lg">Timer: {timer} seconds</Text>
            <Text fontSize="lg">Current Score: {currentScore}</Text>
            <Text fontSize="lg">High Score: {highScore}</Text>
          </HStack>
        </VStack>
      </Center>
    </Box>
  );
};

export default EasyLevelPage;
