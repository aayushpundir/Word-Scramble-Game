import { Box, Center, Heading, Stack, WrapItem, Wrap, Button } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';

const MotionButton = motion(Button);

const Level = () => {
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);

  const buttonVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.3,
      },
    }),
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleEasy = () => {
    if (user === null) {
      navigate('/login');
    } else {
      navigate('/easylevel');
    }
  };

  const handleMedium = () => {
    if (user === null) {
      navigate('/login');
    } else {
      navigate('/mediumlevel');
    }
  };

  const handleHard = () => {
    if (user === null) {
      navigate('/login');
    } else {
      navigate('/hardlevel');
    }
  }

  return (
    <div>
      <Box
        className='level'
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
          <Heading mb={6}>Choose A Level</Heading>
        </Center>
        <Center>
          <Stack direction="column" spacing={6}>
            <Wrap spacing={4}>
              <WrapItem>
                <MotionButton
                  colorScheme='green'
                  initial="hidden"
                  animate="visible"
                  custom={0}
                  variants={buttonVariants}
                  onClick={handleEasy}
                >
                  Easy
                </MotionButton>
              </WrapItem>
              <WrapItem>
                <MotionButton
                  colorScheme='yellow'
                  initial="hidden"
                  animate="visible"
                  custom={1}
                  variants={buttonVariants}
                  onClick={handleMedium}
                >
                  Medium
                </MotionButton>
              </WrapItem>
              <WrapItem>
                <MotionButton
                  colorScheme='red'
                  initial="hidden"
                  animate="visible"
                  custom={2}
                  variants={buttonVariants}
                  onClick={handleHard}
                >
                  Hard
                </MotionButton>
              </WrapItem>
            </Wrap>
          </Stack>
        </Center>
      </Box>
      <Center>
        <MotionButton
          colorScheme='teal'
          initial="hidden"
          animate="visible"
          custom={3}
          variants={buttonVariants}
          onClick={handleLogout}
          mt={4}
          mx="auto"
        >
          Logout
        </MotionButton>
      </Center>
      
    </div>
  )
}

export default Level;
