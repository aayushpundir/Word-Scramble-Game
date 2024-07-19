import React, { useState, useEffect, useContext } from 'react';
import { Box, Button, VStack, Heading } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { AuthContext } from './AuthContext';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (user) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [user]);

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/level');
    }
  }, [isLoggedIn, navigate]);

  return (
    <Box
      bgImage="url('../scrambler.png')"
      bgPosition="center"
      bgRepeat="no-repeat"
      bgSize="cover"
      height="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      {!isLoggedIn && (
        <VStack border="1px" spacing={6} bg="rgba(255, 255, 255, 0.5)" p={8} borderRadius="md">
          <Heading color="black" mb={6}>Welcome to Word Scrambler</Heading>
          <Button
            as={Link}
            to="/login"
            colorScheme="teal"
            size="lg"
            width="full"
            bg="teal.500"
            _hover={{ bg: 'teal.600' }}
            _active={{ bg: 'teal.700' }}
            opacity={0.7}
            fontWeight="bold"
          >
            Login
          </Button>
          <Button
            as={Link}
            to="/register"
            colorScheme="teal"
            size="lg"
            width="full"
            bg="teal.500"
            _hover={{ bg: 'teal.600' }}
            _active={{ bg: 'teal.700' }}
            opacity={0.7}
          >
            Register
          </Button>
        </VStack>
      )}
    </Box>
  );
};

export default Home;
