import { isWithinInterval, getTime } from "date-fns"
import { useCallback } from "react"

export const getOrdersByStatus = useCallback((orders, status) => {
  return orders.filter(order => order.order_status === status)
})

export const getOrdersByDateRange = useCallback(
  (orders, startDate, endDate) => {
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
)
