import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getAllOrders } from './api/airtable.js';
import { getMonth } from 'date-fns';

import ErrorPage from './ErrorPage.jsx';
import LoadingPage from './LoadingPage.jsx';
import SectionCard from './SectionCard.jsx';
import './index.css';

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
      {error && <ErrorPage size={32} />}
      {orders && (
        <div className="">
          <div className="flex-col section-card-conteiner">
            <SectionCard
              name="Total Orders"
              value={formatNumber(orders.length)}
              detail={true}
              detailContent={[
                {
                  name: 'Current Month',
                  value: formatNumber(
                    sortOrdersByMonth(orders, monthToday).length
                  ),
                },
              ]}
            ></SectionCard>

            <SectionCard
              name="Orders in progress"
              value={getOrdersByStatus(orders, 'in_progress').length}
              detail={true}
              detailContent={[
                {
                  name: 'Orders shipped',
                  value: formatNumber(
                    sortOrdersByMonth(orders, monthToday).length
                  ),
                },
                {
                  name: 'Orders placed',
                  value: getOrdersByStatus(orders, 'shipped').length,
                },
                {
                  name: 'Orders shipped',
                  value: getOrdersByStatus(orders, 'placed').length,
                },
                {
                  name: 'Orders cancelled',
                  value: getOrdersByStatus(orders, 'cancelled').length,
                },
              ]}
            ></SectionCard>
            <SectionCard
              name="Revenue"
              detail={true}
              value={`£ ${formatNumber(getTotalRevenue(orders))}`}
            ></SectionCard>
          </div>

          <div className="flex-row-center">Recent orders</div>

          <table>
            <thead>
              <tr>
                <th>Order number</th>
                <th>Date</th>
                <th>Product Name</th>
                <th>Order Status</th>
              </tr>
            </thead>
            <tbody className="">
              {sortOrdersByDate(orders, 10).map((order) => (
                <tr>
                  <td>{order.order_id}</td>
                  <td>{order.order_placed}</td>
                  <td>{order.product_name}</td>
                  <td>{order.order_status}</td>
                </tr>
              ))}
            </tbody>
          </table>
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

function formatNumber(value) {
  return new Intl.NumberFormat('en-GB').format(value);
}
