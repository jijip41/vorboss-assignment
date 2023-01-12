import { getMonth } from "date-fns"

import { useOrders } from "../hooks/useOrders"
import { detailsContent } from "../constants/detailContent"

import { formatNumber } from "./formatNumbers"
import { getOrdersByStatus } from "./getOrders"
import { sortOrdersByMonth } from "./sort"
import { getTotalRevenue } from "./sum"

export type Order = {
  address: string
  email: string
  first_name: string
  last_name: string
  order_id: number
  order_placed: string
  order_status: string
  price: number
  product_name: string
}

const monthToday = getMonth(new Date())
export function getSectionDetails(typeName: string) {
  const { orders }: { orders: Order[] } = useOrders()

  switch (typeName) {
    case "total orders": {
      return {
        name: "Total Orders",
        value: formatNumber(orders.length),
        detail: true,
        contentDetail: [
          {
            name: "Current Month",
            value: formatNumber(sortOrdersByMonth(orders, monthToday).length),
          },
        ],
      }
    }
    case "orders in progress": {
      return {
        name: "Orders in progress",
        value: formatNumber(getOrdersByStatus(orders, "in_progress").length),
        detail: true,
        contentDetail: detailsContent(orders),
      }
    }
    case "revenue": {
      return {
        name: "Revenue",
        value: `£ ${formatNumber(getTotalRevenue(orders, "price"))}`,
        detail: true,
        graph: true,
      }
    }
  }
  throw Error("Unknown action: " + typeName)
}
