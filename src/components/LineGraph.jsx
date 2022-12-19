import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
} from 'recharts';

export function LineGraph(orders) {
  const data = orders;
  return (
    <div style={{ width: '90%', height: 300 }}>
      <p>Monthly Revenue</p>
      <ResponsiveContainer>
        <LineChart
          data={data.orders}
          margin={{
            top: 5,
            right: 40,
            left: 10,
            bottom: 5,
          }}
        >
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip cursor={true} />
          <Line
            type="monotone"
            dataKey="value"
            stroke="#d6976a"
            activeDot={{ r: 4 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
