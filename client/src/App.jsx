import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';

import Header from './Header.jsx';
import Home from './Home.jsx';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Header />
      <Home />
    </QueryClientProvider>
  );
}

export default App;
