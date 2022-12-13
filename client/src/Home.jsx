import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getAllOrders } from './api/airtable.js';
import { getMonth } from 'date-fns';

import ErrorPage from './ErrorPage.jsx';
import LoadingPage from './LoadingPage.jsx';

export default function Home() {
  const {
    isLoading,
    error,
    data: orders,
  } = useQuery(['orders'], getAllOrders, { refetchOnWindowFocus: false });

  // Total Orders

  // Total Orders this month
  const monthToday = getMonth(new Date());

  // Number of orders in progress

  // Revenue

  // A list of the most recent few orders

  return (
    <main>
      {isLoading && <LoadingPage />}
      {error && <ErrorPage />}
      {orders && (
        <div>
          <p> Total Orders : {orders.length}</p>
          <p>
            Total Orders this month:
            {sortOrdersByMonth(orders, monthToday).length}
          </p>
          <p> Revenue: {getTotalRevenue(orders)}</p>
          <p> Recent orders</p>
        </div>
      )}
    </main>
  );
}

function sortOrdersByMonth(orders, month) {
  return orders.filter(
    (order) => getMonth(new Date(order.order_placed)) === month
  );
}

function getTotalRevenue(orders) {
  const total = orders.reduce((a, c) => a + c.price, 0);
  return total.toFixed(2);
}
