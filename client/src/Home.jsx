import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getAllOrders } from './api/airtable.js';
import { getMonth, isWithinInterval, getTime } from 'date-fns';
import DatePicker from 'react-datepicker';
import Calendar from 'react-calendar';

import ErrorPage from './ErrorPage.jsx';
import LoadingPage from './LoadingPage.jsx';
import SectionCard from './SectionCard.jsx';
import './index.css';
import 'react-calendar/dist/Calendar.css';

export default function Home() {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [ordersByRange, setOrdersByRange] = useState([]);
  const {
    isLoading,
    error,
    data: orders,
  } = useQuery(['orders'], getAllOrders, { refetchOnWindowFocus: false });

  const monthToday = getMonth(new Date());

  const handleStartDateChange = (date) => {
    setStartDate(date);
    setOrdersByRange(getOrdersByDateRange(orders, date, endDate));
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
    setOrdersByRange(getOrdersByDateRange(orders, startDate, date));
  };
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
              value={formatNumber(
                getOrdersByStatus(orders, 'in_progress').length
              )}
              detail={true}
              detailContent={[
                {
                  name: 'Orders shipped',
                  value: formatNumber(
                    getOrdersByStatus(orders, 'shipped').length
                  ),
                },
                {
                  name: 'Orders placed',
                  value: formatNumber(
                    getOrdersByStatus(orders, 'placed').length
                  ),
                },
                {
                  name: 'Orders cancelled',
                  value: formatNumber(
                    getOrdersByStatus(orders, 'cancelled').length
                  ),
                },
                {
                  name: 'Cancellation rate',
                  value: formatNumber(
                    (orders.length /
                      getOrdersByStatus(orders, 'cancelled').length) *
                      100
                  ),
                },
              ]}
            ></SectionCard>
            <SectionCard
              name="Revenue"
              detail={true}
              value={`£ ${formatNumber(getTotalRevenue(orders))}`}
            ></SectionCard>
            <div>
              <p>Total orders by date range? </p>
              <div className="calendar-row-left">
                <p>From: </p>

                <DatePicker
                  selected={startDate}
                  onCalendarClose={() => handleStartDateChange(startDate)}
                  calendarContainer={() => MyContainer(startDate, setStartDate)}
                  shouldCloseOnSelect={true}
                  dateFormat="dd/MM/yyyy"
                />
              </div>
              <div className="calendar-row-left">
                <p>To: </p>
                <DatePicker
                  selected={endDate}
                  onCalendarClose={() => handleEndDateChange(endDate)}
                  onChange={handleEndDateChange}
                  calendarContainer={() => MyContainer(endDate, setEndDate)}
                  dateFormat="dd/MM/yyyy"
                />
                {ordersByRange.length}
              </div>
            </div>
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
                <tr key={order.order_id}>
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

function getOrdersByDateRange(orders, startDate, endDate) {
  startDate = getTime(new Date(startDate));
  endDate = getTime(new Date(endDate));

  if (startDate >= endDate) return [];

  return orders.filter((order) => {
    const orderDate = getTime(new Date(order.order_placed));
    return isWithinInterval(new Date(orderDate), {
      start: new Date(startDate),
      end: new Date(endDate),
    });
  });
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

const MyContainer = (date, callback) => {
  return (
    <div>
      <Calendar
        onChange={(data) => callback(data)}
        onClick={(data) => callback(data)}
        value={date}
      />
    </div>
  );
};
