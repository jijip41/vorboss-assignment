import { isWithinInterval, getTime } from "date-fns"

export function getOrdersByStatus(orders, status) {
  return orders.filter(order => order.order_status === status)
}

export function getOrdersByDateRange(orders, startDate, endDate) {
  startDate = getTime(new Date(startDate))
  endDate = getTime(new Date(endDate))

  if (startDate >= endDate) return []

  return orders.filter(order => {
    const orderDate = getTime(new Date(order.order_placed))
    return isWithinInterval(new Date(orderDate), {
      start: new Date(startDate),
      end: new Date(endDate),
    })
  })
}
