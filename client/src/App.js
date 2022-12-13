import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import Home from './Home.js';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Home />
    </QueryClientProvider>
  );
}

export default App;
