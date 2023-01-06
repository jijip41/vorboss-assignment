import { getMonth } from "date-fns"
import { useCallback } from "react"

export const sortOrdersByDate = useCallback((orders, number) => {
  const recentOrders = orders.sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  )
  return recentOrders.slice(0, number)
})

export const sortOrdersByMonth = useCallback((orders, month) => {
  return orders.filter(
    order => getMonth(new Date(order.order_placed)) === month
  )
})
