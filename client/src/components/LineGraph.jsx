import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';

export function LineGraph(orders) {
  const data = orders;
  return (
    <LineChart
      width={500}
      height={300}
      data={data.orders}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line
        type="monotone"
        dataKey="value"
        stroke="#d6976a"
        activeDot={{ r: 8 }}
      />
    </LineChart>
  );
}
