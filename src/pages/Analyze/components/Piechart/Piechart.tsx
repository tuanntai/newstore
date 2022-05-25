import { PureComponent } from 'react'
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts'

// const data = [
//   { name: 'Group A', value: 400 },
//   { name: 'Group B', value: 300 }
// ]

export interface IChartData {
  name: string
  value: number
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042']

const RADIAN = Math.PI / 180
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index
}: any) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5
  const x = cx + radius * Math.cos(-midAngle * RADIAN)
  const y = cy + radius * Math.sin(-midAngle * RADIAN)

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  )
}

const getIntroOfPage = (label: string) => {
  if (label === 'Group A') {
    return 'Bought Book'
  }
  if (label === 'Group B') {
    return 'Selling Book'
  }
  return ''
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip">
        <p className="label">{`${payload[0].name} : ${payload[0].value}`}</p>
        <p className="intro">{getIntroOfPage(active)}</p>
        <p className="desc">Anything you want can be displayed here.</p>
      </div>
    )
  }

  return null
}

const Chart = ({ data }: { data: IChartData[] }) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart width={600} height={600}>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
        >
          {console.log({ data })}
          {data.map((entry: IChartData, index: number) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend layout="centric" verticalAlign="middle" align="left" height={36} />
      </PieChart>
    </ResponsiveContainer>
  )
}

export default Chart
