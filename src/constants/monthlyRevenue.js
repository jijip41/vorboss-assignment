import { getMonth, getYear } from 'date-fns';

export function monthlyRevenue(orders) {
  const result = {};

  return orders.reduce((a, c) => {
    const month = getMonth(new Date(c.order_placed)) + 1;
    const year = getYear(new Date(c.order_placed));
    const monthYear = `${month}/${year}`;
    const isExsist = result.hasOwnProperty(monthYear);

    if (!isExsist) {
      result[monthYear] = c.price;
    } else {
      result[monthYear] += c.price;
    }
    return Object.entries(result)
      .map(([monthYear, revenue]) => {
        return { name: monthYear, value: parseInt(revenue) };
      })
      .reverse();
  });
}
