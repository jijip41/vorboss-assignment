import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getAllOrders } from './api/airtable.js';
import { CircleNotch } from 'phosphor-react';

import ErrorPage from './ErrorPage.jsx';

export default function Home() {
  const {
    isLoading,
    error,
    data: orders,
  } = useQuery(['orders'], getAllOrders, { refetchOnWindowFocus: false });
  console.log(orders?.length);

  // Total Orders

  // Total Orders this month

  // Number of orders in progress

  // Revenue

  // A list of the most recent few orders

  return (
    <main>
      {isLoading && <CircleNotch size={32} />}
      {error && <ErrorPage />}
      {orders && <div>Total Orders</div>}
    </main>
  );
}
