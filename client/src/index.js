import { ChakraProvider } from "@chakra-ui/react";
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { AuthProvider } from "./components/AuthContext.jsx";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ChakraProvider centerContent>
    <AuthProvider>
      <App />
    </AuthProvider>
  </ChakraProvider>
);
