import React, { useState } from 'react';
import { Box, Button, Input, Heading, VStack, Text, Link as ChakraLink, Center, InputGroup, InputRightElement, FormControl, FormLabel } from '@chakra-ui/react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [aliasName, setAliasName] = useState('');
  const [name, setName] = useState('');
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleClick = () => setShow(!show);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://word-scramble-game-server.onrender.com/register', { name, aliasName, email, password });
      console.log(response.data);

      if (response.status === 201) {
        console.log('Registration successful');
        navigate('/login');
      } else {
        console.error('Registration failed:', response.data);
      }
    } catch (error) {
      console.error('Registration failed:', error);
    }
  };

  return (
    <Box
      bg="rgba(255, 255, 255, 0.5)"
      p={8}
      borderRadius="md"
      boxShadow="0px 4px 12px rgba(0, 0, 0, 0.1)"
      maxW="md"
      borderWidth="1px"
      overflow="hidden"
      border="1px solid black"
      mx="auto"
      mt={8}
      w="50vw"
    >
      <Center>
        <Heading mb={6}>Register</Heading>
      </Center>
      <VStack spacing={4}>
        <FormControl id="name" isRequired>
          <FormLabel>Name</FormLabel>
          <Input
            name='name'
            border="1px"
            type="text"
            placeholder='Enter Your Name'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </FormControl>
        <FormControl id="aliasName">
          <FormLabel>Alias Name</FormLabel>
          <Input
            name='aliasName'
            border="1px"
            type="text"
            placeholder='Enter Your Alias'
            value={aliasName}
            onChange={(e) => setAliasName(e.target.value)}
          />
        </FormControl>
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
              <Button h="1.75rem" size="sm" onClick={handleClick}>
                {show ? "Hide" : "Show"}
              </Button>
            </InputRightElement>
          </InputGroup>
        </FormControl>
        <Button onClick={handleSubmit} colorScheme="teal" size="md" width="full">Register</Button>
        <Text mt={4}>
          Already a user?{' '}
          <ChakraLink as={Link} to="/login" color="cyan">
            Login
          </ChakraLink>
        </Text>
      </VStack>
    </Box>
  );
};

export default Register;
