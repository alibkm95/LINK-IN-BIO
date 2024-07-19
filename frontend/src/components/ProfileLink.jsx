import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import { BsArrowUpRightSquareFill } from "react-icons/bs";
import { PiWarningFill } from "react-icons/pi";

const ProfileLink = ({ domain }) => {

  return (
    <Link
      to='/r/shoertid'
      className='p-4 rounded-box bg-base-300 shadow-lg link link-hover hover:text-blue-500 hover:shadow-md transition-all'
    >
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 min-w-10 min-h-10 rounded-full overflow-hidden bg-base-100 border border-primary">
          <img
            className='w-full h-full object-contain'
            src={`https://icon.horse/icon/${domain}`}
            alt="icon"
          />
        </div>
        <div className="flex-1 overflow-hidden">
          <div className="font-semibold overflow-hidden text-ellipsis">
            {domain}
          </div>
        </div>
      </div>
    </Link>
  )
}

export default ProfileLink