import React, { useEffect, useState } from 'react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const LinkChart = ({ chartData }) => {

  const [chartRange, setChartRange] = useState('last-month')
  const [filteredData, setFilteredData] = useState([])

  // const chartData = [
  //   { date: '2024/07/14', count: 5 },
  //   { date: '2024/06/14', count: 29 },
  //   { date: '2024/05/14', count: 13 },
  //   { date: '2024/04/14', count: 70 },
  // ]

  useEffect(() => {
    if (chartData) {
      if (chartRange === 'last-month') {
        const lastMonth = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).getTime()
        const lastMonthData = chartData.filter(item => item.timestamp >= lastMonth)
        return setFilteredData(lastMonthData)
      }

      return setFilteredData(chartData)
    }
  }, [chartData, chartRange])

  return (
    <div className='bg-base-100 p-4 rounded-box shadow-md h-full min-h-96'>
      <h4 className="text-xl font-bold pb-4 mb-4 border-b border-b-base-content/20">
        Click records of link:
      </h4>
      {
        filteredData.length < 2 &&
        <div className="flex items-center justify-center w-full h-full max-h-80">
          <div className="flex flex-col items-center justify-center gap-4 opacity-35">
            <span className='text-3xl'>¯\_(ツ)_/¯</span>
            <span>there is no records!!</span>
          </div>
        </div>
      }
      {
        filteredData.length >= 2 &&
        <>
          <div className="join mb-4">
            <input
              className="join-item btn btn-sm"
              type="radio"
              name="options"
              aria-label="last month"
              defaultChecked
              onChange={e => { e.target.checked && setChartRange('last-month') }}
            />
            <input
              className="join-item btn btn-sm"
              type="radio"
              name="options"
              aria-label="all time"
              onChange={e => { e.target.checked && setChartRange('all-time') }}
            />
          </div>
          <ResponsiveContainer className='w-full h-full max-h-80'>
            <AreaChart
              width={500}
              height={400}
              data={filteredData}
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
              <Area type="monotone" dataKey="clickCount" stroke="#8884d8" fill="#8884d8" />
            </AreaChart>
          </ResponsiveContainer>
        </>
      }
    </div>
  )
}

export default LinkChart