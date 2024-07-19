import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Box } from '@chakra-ui/react';
import Login from './components/Login';
import Register from './components/Register'; 
import Home from './components/Home';
import Level from './components/Level';
import EasyLevel from './components/levels/EasyLevel';
import MediumLevel from './components/levels/MediumLevel';
import HardLevel from './components/levels/HardLevel';
import './App.css';

const App = () => {
  
  return (
    <div className="App" >
    <Router >
      <Box p={4}>
        <Routes>
          <Route path="/" element={<Home />}  exact/>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/level" element={<Level />} />
          <Route path="/easylevel" element={<EasyLevel />} />
          <Route path="/mediumlevel" element={<MediumLevel />} />
          <Route path="/hardlevel" element={<HardLevel />} />
        </Routes>
      </Box>
    </Router>
    </div>
  );
};

export default App;
