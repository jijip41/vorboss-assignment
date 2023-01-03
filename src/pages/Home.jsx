import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getMonth } from 'date-fns';

import '../index.css';
import 'react-calendar/dist/Calendar.css';
import { getAllOrders } from '../api/airtable.js';
import ErrorPage from './ErrorPage';
import LoadingPage from './LoadingPage.jsx';
import SectionCard from '../components/SectionCard.jsx';
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
import Table from '../components/Table';
import OrdersByDateRange from '../components/OrdersByDateRange';

export default function Home() {
  const {
    isLoading,
    error,
    data: orders,
  } = useQuery(['orders'], getAllOrders, { refetchOnWindowFocus: false });

  const monthToday = getMonth(new Date());

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
            <div className="flex-col-center ">
              <p className="card-name content-center title text-color-vorboss2">
                Total orders by date range
              </p>
              <OrdersByDateRange orders={orders} />
            </div>
          </div>
          <div className="flex-col-center">
            <p className="title ">Recent orders</p>
            <Table orders={orders} />
          </div>
        </div>
      )}
    </main>
  );
}
