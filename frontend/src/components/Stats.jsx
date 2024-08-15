import React, { useEffect, useState } from 'react'

import { formatNumber } from '../utils/utils';

import { FaLink } from "react-icons/fa";
import { HiCursorClick } from "react-icons/hi";
import { FaUser } from "react-icons/fa";

const Stats = () => {

  const [mainStatData, setMainStatData] = useState(null)
  const [loading, setLoading] = useState(true)

  const fetchMainStats = async () => {
    const res = await fetch('/api/stat')
    const data = await res.json()

    if (res.status === 200) {
      setLoading(false)
      return setMainStatData(data)
    }

    setLoading(false)
    return setMainStatData(null)
  }

  useEffect(() => {
    fetchMainStats()
  }, [])

  return (
    <div className="my-8 grid place-items-center">
      {
        loading && <span className="loading loading-bars loading-lg"></span>
      }
      {
        mainStatData &&
        <div className="stats stats-vertical md:stats-horizontal shadow-xl bg-base-200">
          <div className="stat min-w-60">
            <div className="stat-figure text-primary">
              <FaLink size={30} />
            </div>
            <div className="stat-title">We host</div>
            <div className="stat-value text-primary">{formatNumber(mainStatData.linkCount)}</div>
            <div className="stat-desc">links in total</div>
          </div>
          <div className="stat min-w-60">
            <div className="stat-figure text-secondary">
              <HiCursorClick size={30} />
            </div>
            <div className="stat-title">We registered</div>
            <div className="stat-value text-secondary">{formatNumber(mainStatData.clickCount)}</div>
            <div className="stat-desc">clicks in total</div>
          </div>
          <div className="stat min-w-60">
            <div className="stat-figure text-accent">
              <FaUser size={40} />
            </div>
            <div className="stat-value">{formatNumber(mainStatData.userCount)}</div>
            <div className="stat-title">User</div>
            <div className="stat-desc text-accent">trusted us</div>
          </div>
        </div>
      }
      {
        !loading && !mainStatData &&
        <div role="alert" className="alert max-w-5xl shadow-md">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 shrink-0 stroke-current"
            fill="none"
            viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <span>Error while getting analytics data!</span>
        </div>
      }
    </div>
  )
}

export default Stats