import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

import { FaCheckCircle } from "react-icons/fa";
import { HiCursorClick } from "react-icons/hi";
import { MdDoNotDisturbAlt } from "react-icons/md";
import { TiWarning } from "react-icons/ti";
import { formatNumber, getCurrentDomain } from '../utils/utils';

const LinkInfo = ({ link }) => {

  const [URL, setURL] = useState('')

  useEffect(() => {
    if (link) setURL(`${getCurrentDomain()}/r/${link.shortLink}`)
  }, [link])

  return (
    <div className='flex flex-col gap-4  mx-auto'>
      {
        link &&
        <>
          <div className="grid place-items-center lg:place-items-start">
            <div className="stats stats-vertical md:stats-horizontal shadow-xl bg-base-100">
              {
                link.isActive && !link.isBanned ?
                  (
                    <div className="stat min-w-60">
                      <div className="stat-figure text-primary">
                        <FaCheckCircle size={30} />
                      </div>
                      <div className="stat-title">This link is in</div>
                      <div className="stat-value text-primary">Active</div>
                      <div className="stat-desc">state</div>
                    </div>
                  ) : (
                    <div className="stat min-w-60">
                      <div className="stat-figure text-error">
                        <TiWarning size={30} />
                      </div>
                      <div className="stat-title">This link is in</div>
                      <div className="stat-value text-error">Deactive</div>
                      <div className="stat-desc">state</div>
                    </div>
                  )
              }
              <div className="stat min-w-60">
                <div className="stat-figure text-secondary">
                  <HiCursorClick size={30} />
                </div>
                <div className="stat-title">This link has</div>
                <div className="stat-value text-secondary">{formatNumber(link.clicks)}</div>
                <div className="stat-desc">clicks in total</div>
              </div>
              <div className="stat min-w-60">
                <div className="stat-figure text-accent">
                  <MdDoNotDisturbAlt size={40} />
                </div>
                <div className="stat-title">age restriction is</div>
                <div className="stat-value">{link.isAgeRestrict ? "Active" : "Disabled"}</div>
                <div className="stat-desc">on this link</div>
              </div>
            </div>
          </div>
          <div>
            <span>Origin URL:</span>
            <p>
              <Link
                to={link.longLink}
                target='_blank'
                className='font-semibold text-blue-600 link link-hover'
              >
                {link.longLink}
              </Link>
            </p>
            <span>Shortned URL:</span>
            <p>
              <Link to={`/r/${link.shortLink}`} className='font-semibold text-blue-600 link link-hover'>
                {URL}
              </Link>
            </p>
            <p>
              Created At:
              <span className="font-semibold">
                {' ' + new Date(link.createdAt).toLocaleDateString()}
              </span>
            </p>
          </div>
          <div className="flex flex-col items-center gap-4 md:flex-row">
            {
              link.isBanned &&
              <div role="alert" className="alert alert-warning py-2">
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
                <span>This link is banned. Head the support section and get relevant instructions.</span>
              </div>
            }
            {/* todo => start implementing delete modal and handle deleting link */}
            <button className="btn btn-sm btn-error max-w-40">
              Remove link
            </button>
          </div>
        </>
      }
    </div>
  )
}

export default LinkInfo