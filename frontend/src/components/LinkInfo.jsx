import React from 'react'

import { FaCheckCircle } from "react-icons/fa";
import { HiCursorClick } from "react-icons/hi";
import { MdDoNotDisturbAlt } from "react-icons/md";
import { Link } from 'react-router-dom';

const LinkInfo = () => {
  return (
    <div className='flex flex-col gap-4 w-max mx-auto'>
      <div className="grid place-items-center">
        <div className="stats stats-vertical md:stats-horizontal shadow-xl bg-base-100">
          <div className="stat min-w-60">
            <div className="stat-figure text-primary">
              <FaCheckCircle size={30} />
            </div>
            <div className="stat-title">This link is in</div>
            <div className="stat-value text-primary">Active</div>
            <div className="stat-desc">state</div>
          </div>
          <div className="stat min-w-60">
            <div className="stat-figure text-secondary">
              <HiCursorClick size={30} />
            </div>
            <div className="stat-title">This link has</div>
            <div className="stat-value text-secondary">2.6M</div>
            <div className="stat-desc">clicks in total</div>
          </div>
          <div className="stat min-w-60">
            <div className="stat-figure text-accent">
              <MdDoNotDisturbAlt size={40} />
            </div>
            <div className="stat-title">age restriction is</div>
            <div className="stat-value">Active</div>
            <div className="stat-desc">on this link</div>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-end gap-4 md:flex-row md:justify-between">
        <div>
          <span>Origin URL:</span>
          <p>
            <a href="www.google.com" target='_blank' className='font-semibold text-blue-600 link link-hover'>
              www.google.com
            </a>
          </p>
          <span>Shortned URL:</span>
          <p>
            <Link to='/r/shortId' className='font-semibold text-blue-600 link link-hover'>
              http://localhost:3000/r/sMafTx_0p
            </Link>
          </p>
          <p>Created At: <span className="font-semibold">2024/7/15</span></p>
        </div>
        <button className="btn btn-sm btn-error">
          Remove link
        </button>
      </div>
    </div>
  )
}

export default LinkInfo