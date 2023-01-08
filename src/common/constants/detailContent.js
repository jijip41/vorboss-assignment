import { formatNumber } from "../helper/formatNumbers"
import { getOrdersByStatus } from "../helper/getOrders"

export function detailsContent(orders) {
  return [
    {
      name: "Orders shipped",
      value: formatNumber(getOrdersByStatus(orders, "shipped").length),
    },
    {
      name: "Orders placed",
      value: formatNumber(getOrdersByStatus(orders, "placed").length),
    },
    {
      name: "Orders cancelled",
      value: formatNumber(getOrdersByStatus(orders, "cancelled").length),
    },
    {
      name: "Cancellation rate",
      value: `${formatNumber(
        (getOrdersByStatus(orders, "cancelled").length / orders.length) * 100
      )} %`,
    },
  ]
}
