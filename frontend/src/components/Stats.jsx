import React from 'react'

import { FaLink } from "react-icons/fa";
import { HiCursorClick } from "react-icons/hi";
import { FaUser } from "react-icons/fa";

const Stats = () => {
  return (
    <div className="my-8 grid place-items-center">
      <div className="stats stats-vertical md:stats-horizontal shadow-xl bg-base-200">
        <div className="stat min-w-52">
          <div className="stat-figure text-primary">
            <FaLink size={30} />
          </div>
          <div className="stat-title">We host</div>
          <div className="stat-value text-primary">25.6K</div>
          <div className="stat-desc">links in total</div>
        </div>
        <div className="stat min-w-52">
          <div className="stat-figure text-secondary">
            <HiCursorClick size={30} />
          </div>
          <div className="stat-title">We registered</div>
          <div className="stat-value text-secondary">2.6M</div>
          <div className="stat-desc">clicks in total</div>
        </div>
        <div className="stat min-w-52">
          <div className="stat-figure text-accent">
            <FaUser size={40} />
          </div>
          <div className="stat-value">2.8K</div>
          <div className="stat-title">User</div>
          <div className="stat-desc text-accent">trusted us</div>
        </div>
      </div>
    </div>
  )
}

export default Stats