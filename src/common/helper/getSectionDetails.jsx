import { getMonth } from "date-fns"

import { useOrders } from "../hooks/useOrders.jsx"
import { detailsContent } from "../constants/detailContent.jsx"

import { formatNumber } from "./formatNumbers.jsx"
import { getOrdersByStatus } from "./getOrders.jsx"
import { sortOrdersByMonth } from "./sort.jsx"
import { getTotalRevenue } from "./sum.jsx"

const monthToday = getMonth(new Date())
export function getSectionDetails(typeName) {
  const { orders } = useOrders()

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
