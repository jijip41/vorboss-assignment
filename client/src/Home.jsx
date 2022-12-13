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
          <p>
            Orders in progress:{' '}
            {getOrdersByStatus(orders, 'in_progress').length}
          </p>
          <p> Revenue: {getTotalRevenue(orders)}</p>
          <p>
            {' '}
            Recent orders:{' '}
            <div className="flex">
              <div>Order number</div>
              <div>Date</div>
              <div>Product Name</div>
              <div>Order Status</div>
            </div>
            {sortOrdersByDate(orders, 10).map((order) => (
              <div key={order.order_id} className="flex">
                <p>{order.order_id}</p>
                <p>{order.order_placed}</p>
                <p>{order.product_name}</p>
                <p>{order.order_status}</p>
              </div>
            ))}
          </p>
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

function getOrdersByStatus(orders, status) {
  return orders.filter((order) => order.order_status === status);
}

function sortOrdersByDate(orders, number) {
  const recentOrders = orders.sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );
  return recentOrders.slice(0, number);
}
