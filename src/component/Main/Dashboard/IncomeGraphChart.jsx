import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

const IncomeGraphChart = () => {
  const data = [
    { month: 'Jan', income: 4 },
    { month: 'Feb', income: 9 },
    { month: 'Mar', income: 9.1 },
    { month: 'Apr', income: 3 },
    { month: 'May', income: 12 },
    { month: 'Jun', income: 12.9 },
  ];

  return (
    <section className="w-full col-span-full md:col-span-2 bg-gray-100 rounded-lg ">
      <ResponsiveContainer width="100%" maxHeight={500} minHeight={300} height={400} className="pr-5 pt-5">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip contentStyle={{ backgroundColor: '#888', color: 'white', borderRadius: '10px' }} />
          <Legend />

          {/* Only Income Line */}
          <Line
            type="monotone"
            dataKey="income"
            stroke="#2421f4"
            activeDot={{ r: 8 }}
            strokeWidth={4}
          />
        </LineChart>
      </ResponsiveContainer>
    </section>
  );
};

export default IncomeGraphChart;
