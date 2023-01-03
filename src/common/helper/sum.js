export function getTotalRevenue(orders, key) {
  const total = orders.reduce((a, c) => a + c[key], 0)
  return total.toFixed(2)
}
