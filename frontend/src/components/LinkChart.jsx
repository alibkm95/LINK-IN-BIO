import React from 'react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const LinkChart = () => {

  const chartData = [
    { date: '2024/07/14', count: 5 },
    { date: '2024/06/14', count: 29 },
    { date: '2024/05/14', count: 13 },
    { date: '2024/04/14', count: 70 },
  ]

  return (
    <div className='bg-base-100 p-4 rounded-box shadow-md h-full min-h-96'>
      <h4 className="text-xl font-bold pb-4 mb-4 border-b border-b-base-content/20">
        Click records of link:
      </h4>
      <ResponsiveContainer className='w-full h-full max-h-80'>
        <AreaChart
          width={500}
          height={400}
          data={chartData}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey='date' />
          <YAxis />
          <Tooltip />
          <Area type="monotone" dataKey="count" stroke="#8884d8" fill="#8884d8" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}

export default LinkChart