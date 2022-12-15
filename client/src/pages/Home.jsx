import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getMonth } from 'date-fns';
import DatePicker from 'react-datepicker';

import '../index.css';
import 'react-calendar/dist/Calendar.css';
import { getAllOrders } from '../api/airtable.js';
import ErrorPage from './ErrorPage';
import LoadingPage from './LoadingPage.jsx';
import SectionCard from '../components/SectionCard.jsx';
import CalendarContainer from '../components/CalendarContainer.jsx';
import { LineGraph } from '../components/LineGraph';
import { sortOrdersByDate, sortOrdersByMonth } from '../helper/sort.js';
import {
  getOrdersByDateRange,
  getOrdersByStatus,
} from '../helper/getOrders.js';
import { formatNumber } from '../helper/formatNumbers.js';
import { getTotalRevenue } from '../helper/sum.js';
import { detailsContent } from '../constants/detailContent';
import { monthlyRevenue } from '../constants/monthlyRevenue';

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
              detailContent={detailsContent(orders)}
            ></SectionCard>
            <SectionCard
              name="Revenue"
              detail={true}
              value={`£ ${formatNumber(getTotalRevenue(orders, 'price'))}`}
              graph={<LineGraph orders={monthlyRevenue(orders)} />}
            ></SectionCard>
            <div className="flex-col-center">
              <p className="card-name content-center">
                Total orders by date range
              </p>
              <div className="flex-row">
                <div className="calendar-row-left">
                  <p className="padding-x-small">From: </p>

                  <DatePicker
                    selected={startDate}
                    onCalendarClose={() => handleStartDateChange(startDate)}
                    calendarContainer={() =>
                      CalendarContainer(startDate, setStartDate)
                    }
                    shouldCloseOnSelect={true}
                    dateFormat="dd/MM/yyyy"
                  />
                </div>
                <div className="calendar-row-left">
                  <p className="padding-x-small">To: </p>
                  <DatePicker
                    selected={endDate}
                    onCalendarClose={() => handleEndDateChange(endDate)}
                    onChange={handleEndDateChange}
                    calendarContainer={() =>
                      CalendarContainer(endDate, setEndDate)
                    }
                    dateFormat="dd/MM/yyyy"
                  />
                </div>
                <div className="flex-row-center card-value">
                  {ordersByRange.length}
                </div>
              </div>
            </div>
          </div>
          <div className="flex-col-center">
            <p className="card-name content-center">Recent orders</p>
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
                {sortOrdersByDate(orders, 10).map(
                  ({ order_id, order_placed, product_name, order_status }) => (
                    <tr key={order_id}>
                      <td>{order_id}</td>
                      <td>{order_placed}</td>
                      <td>{product_name}</td>
                      <td>{order_status.replaceAll('_', ' ')}</td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </main>
  );
}
