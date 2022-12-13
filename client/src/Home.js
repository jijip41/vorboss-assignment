import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getAllOrders } from './api/airtable.js';

function Home(props) {
  const {
    isLoading,
    error,
    data: orders,
  } = useQuery(['orders'], getAllOrders, { refetchOnWindowFocus: false });
  console.log(orders);

  return <div>hihi</div>;
}

export default Home;
