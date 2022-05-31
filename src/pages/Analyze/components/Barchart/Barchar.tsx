import React, { PureComponent } from 'react'
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts'

const BarChartContainer = ({ data }: any) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        width={1000}
        height={300}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend verticalAlign="bottom" align="center" height={36} />
        <Bar dataKey="createdBook" fill="#8884d8" />
        <Bar dataKey="soldBook" fill="#82ca9d" />
      </BarChart>
    </ResponsiveContainer>
  )
}

export default BarChartContainer
