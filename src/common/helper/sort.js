import { getMonth } from "date-fns"

export function sortOrdersByDate(orders, number) {
  const recentOrders = orders.sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  )
  return recentOrders.slice(0, number)
}

export function sortOrdersByMonth(orders, month) {
  return orders.filter(
    order => getMonth(new Date(order.order_placed)) === month
  )
}
