import React, { useState, useContext } from 'react';
import { Box, Button, Input, Heading, VStack, Text, Link as ChakraLink, Center, InputGroup, InputRightElement, FormControl, FormLabel } from '@chakra-ui/react';
import axios from 'axios';  
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';

const Login = () => {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [alert, setAlert] = useState(false); // Initially set to false
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const handleClick = () => setShow(!show);
  


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://word-scramble-game-server.onrender.com/login', { email, password });
      console.log(response.data);

      if (response.status === 200) {
        setAlert(false); // Reset alert on successful login
        console.log('Login successful');
        login({ email });
        navigate('/level');
      } else {
        setAlert(true);
        console.error('Login failed:', response.data); 
      }
    } catch (error) {
      setAlert(true); // Set alert on error
      console.error('Login failed:', error);
    }
  };

  return (
    <Box
      className='Login'
      bg="rgba(255, 255, 255, 0.5)"
      p={8}
      borderRadius="md"
      boxShadow="0px 4px 12px rgba(0, 0, 0, 0.1)"
      maxW="md"
      borderWidth="1px"
      overflow="hidden"
      mx="auto"
      border="1px"
      mt={8}
      w="50vw"
    >
      <Center>
        <Heading mb={6}>Login</Heading>
      </Center>
      {alert && (
        <Center>
          <Text color="red.500" mb={6}>Wrong Credentials</Text>
        </Center>
      )}
      <VStack spacing={4}>
        <FormControl id="email" isRequired>
          <FormLabel>Email</FormLabel>
          <Input
            name='email'
            border="1px"
            type="email"
            placeholder='Enter Your Email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormControl>
        <FormControl id="password" isRequired>
          <FormLabel>Password</FormLabel>
          <InputGroup>
            <Input 
              name='password'
              border="1px"
              type={show ? "text" : "password"}
              placeholder='Enter Your Password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <InputRightElement width="4.5rem">
              <Button h="1.75rem" size="sm" onClick={handleClick} colorScheme="teal">
                {show ? "Hide" : "Show"}
              </Button>
            </InputRightElement>
          </InputGroup>
        </FormControl>
        <Button onClick={handleSubmit} colorScheme="teal" size="md" width="full">Login</Button>
        <Text mt={4}>
          Not a user?{' '}
          <ChakraLink as={Link} to="/register" color="teal.500">
            Register
          </ChakraLink>
        </Text>
      </VStack>
    </Box>
  );
};

export default Login;
