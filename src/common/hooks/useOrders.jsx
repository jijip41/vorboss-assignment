import { useQuery } from "@tanstack/react-query"

import { getAllOrders } from "../api/airtable.jsx"

export function useOrders() {
  const {
    isLoading,
    error,
    data: orders,
  } = useQuery(["orders"], getAllOrders, { refetchOnWindowFocus: false })

  return { isLoading, error, orders }
}
