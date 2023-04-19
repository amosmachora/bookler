import React from 'react';
import { LineChart, Line, ResponsiveContainer } from 'recharts';

const LineGraph = ({ prices }: { prices: number[] }) => {
  const arrayOfPriceObjects: { price: number }[] = [];

  prices.forEach((price) =>
    arrayOfPriceObjects.push({
      price: price,
    })
  );

  return (
    <ResponsiveContainer width="100%" height={80}>
      <LineChart data={arrayOfPriceObjects}>
        <Line type="monotone" dataKey="price" stroke="#8884d8" />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default LineGraph;
