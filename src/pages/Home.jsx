import "../index.css"
import "react-calendar/dist/Calendar.css"

import { SectionCard } from "../common/components/SectionCard.jsx"
import { OrdersByDateRange } from "../common/components/OrdersByDateRange.jsx"
import { Table } from "../common/components/Table.jsx"
import { useOrders } from "../common/hooks/useOrders.jsx"

import { LoadingPage } from "./LoadingPage.jsx"
import { ErrorPage } from "./ErrorPage.jsx"

export function Home() {
  const { isLoading, error, orders } = useOrders()

  return (
    <main>
      {isLoading && <LoadingPage />}
      {error && <ErrorPage size={32} />}
      {orders && (
        <div className="">
          <div className="flex-col section-card-conteiner">
            <SectionCard typeName="total orders" />
            <SectionCard typeName="orders in progress" />
            <SectionCard typeName="revenue" />
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
  )
}
