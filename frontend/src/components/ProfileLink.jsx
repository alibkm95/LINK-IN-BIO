import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { extractDomain } from '../utils/utils'


const ProfileLink = ({ linkData }) => {

  const baseDomain = extractDomain(linkData.longLink)
  console.log(linkData)

  return (
    <Link
      to={`/r/${linkData.shortLink}`}
      className='p-4 rounded-box bg-base-300 shadow-lg link link-hover hover:text-blue-500 hover:shadow-md transition-all w-full max-w-2xl mx-auto'
    >
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 min-w-10 min-h-10 rounded-full overflow-hidden border border-primary flex items-center justify-center p-1 bg-white">
          <img
            className='max-w-full max-h-full'
            src={`https://www.google.com/s2/favicons?domain=${baseDomain}&sz=256`}
            alt="icon"
          />
        </div>
        <div className="flex-1 overflow-hidden">
          <div className="font-semibold overflow-hidden text-ellipsis">
            {linkData.title ? linkData.title : baseDomain}
          </div>
        </div>
      </div>
    </Link>
  )
}

export default ProfileLink