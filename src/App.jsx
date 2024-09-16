// frontend/src/App.js
import React from 'react';
import { ChakraProvider, Container } from '@chakra-ui/react';
import ComplaintForm from './components/ComplaintForm';

function App() {
  return (
    <ChakraProvider>
      <Container >
        <ComplaintForm />
      </Container>
    </ChakraProvider>
  );
}

export default App;
