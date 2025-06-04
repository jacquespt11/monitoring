'use client';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import React from 'react';

type ChartProps = {
  title: string;
  data: { name: string; value: number }[];
  color?: string;
};

export default function ChartCard({ title, data, color = "#3b82f6" }: ChartProps) {
  return (
    <div className="bg-gray-1000 bg-opacity-95 p-5 rounded-lg shadow-md text-white border-1 border-gray-800 hover:shadow-lg transition">
      <h4 className="text-lg font-semibold mb-4">{title}</h4>
      <ResponsiveContainer width="100%" height={185}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#555" />
          <XAxis dataKey="name" stroke="#ccc" />
          <YAxis stroke="#ccc" />
          <Tooltip />
          <Line type="monotone" dataKey="value" stroke={color} strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
