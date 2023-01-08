import { getMonth } from "date-fns"

import { useOrders } from "../hooks/useOrders"
import { detailsContent } from "../constants/detailContent"
import { formatNumber } from "../helper/formatNumbers"
import { getOrdersByStatus } from "../helper/getOrders"
import { sortOrdersByMonth } from "../helper/sort"
import { getTotalRevenue } from "../helper/sum"

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
