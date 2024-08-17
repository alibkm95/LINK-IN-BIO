import React, { useEffect, useState } from 'react'
import QRCodeProfile from './QRCodeProfile';

import FallbackCover from '../assets/cover.jpg'
import FallbackProfile from '../assets/profile.svg'

import { RiVerifiedBadgeFill } from "react-icons/ri";
import { IoQrCode } from "react-icons/io5";

const UserProfile = ({ user }) => {

  const [showQRCode, setShowQRCode] = useState(false)

  if (!user) {
    return (
      <div className='flex items-center justify-center p-24'>
        <span className="loading loading-bars loading-lg"></span>
      </div>
    )
  }

  return (
    <div className='relative'>
      <img src={user.coverImg ? `/api/file/cover/${user.coverImg}` : FallbackCover} className="w-full h-36 md:h-44 object-cover" />
      <div className="absolute top-0 w-full h-36 md:h-44 bg-gradient-to-t from-black/50 via-black/30 to-transparent"></div>
      <div className=" px-4 -translate-y-8 md:px-8 md:-translate-y-12">
        <div className="bg-base-100 w-16 h-16 rounded-full overflow-hidden md:w-24 md:h-24">
          <img className='w-full bg-white' src={user.profileImg ? `/api/file/profile/${user.profileImg}` : FallbackProfile} />
        </div>
        <div className="mt-2 flex items-center gap-2 text-xl font-bold md:text-2xl">
          <h1 className=''>@{user.username}</h1>
          <RiVerifiedBadgeFill className='text-blue-600 me-auto' />
          <button className="btn btn-square btn-ghost" onClick={() => { setShowQRCode(prev => !prev) }}>
            <IoQrCode className='text-xl md:text-2xl text-info' />
          </button>
        </div>
      </div>
      <div className={`collapse ${showQRCode ? 'collapse-open p-2' : 'collapse-close'}`}>
        <div className="collapse-content">
          <QRCodeProfile user={user} />
        </div>
      </div>
    </div>
  )
}

export default UserProfile