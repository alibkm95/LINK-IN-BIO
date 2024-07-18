import React, { useState } from 'react'
import QRCodeProfile from './QRCodeProfile';

import FallbackCover from '../assets/cover.jpg'

import { RiVerifiedBadgeFill } from "react-icons/ri";
import { IoQrCode } from "react-icons/io5";

const UserProfile = () => {

  const [showQRCode, setShowQRCode] = useState(false)

  return (
    <div className='relative'>
      <img src={FallbackCover} alt="" className="w-full h-36 md:h-44 object-cover" />
      <div className="absolute top-0 w-full h-36 md:h-44 bg-gradient-to-t from-black/50 via-black/30 to-transparent"></div>
      <div className=" px-4 -translate-y-8 md:px-8 md:-translate-y-12">
        <div className="bg-base-100 w-16 h-16 rounded-full md:w-24 md:h-24">
          <svg className='fill-base-content' id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 300"><path d="M150.05,32c65.39.1,118.53,53.3,118.42,118.53C268.35,215.91,215.21,269,150,268.9,84.46,268.79,31.38,215.66,31.5,150.33S84.79,31.84,150.05,32Zm1.33,232.12a113.67,113.67,0,1,0-3-227.32C86.22,37.4,35.63,89.1,36.29,151.32A113.64,113.64,0,0,0,151.38,264.07Z" /><path d="M148.88,240.55A257.88,257.88,0,0,1,119,239.5c-6.28-.66-12.62-1.14-18.77-2.48A58.66,58.66,0,0,1,74.94,225a6,6,0,0,1-1.48-3.16,87.8,87.8,0,0,1-2-21.57,81.47,81.47,0,0,1,7.27-32.65c2.7-5.79,6-11.15,10.86-15.35,5.82-5,12.42-7.13,20-4.88a15.18,15.18,0,0,1,7,4.2c3.47,3.78,7.85,6,12.56,7.67a56.3,56.3,0,0,0,41.23-1,28,28,0,0,0,9.64-6.35c5.49-5.59,13.63-7,21.08-3.63,6.49,2.89,10.93,8,14.35,14,8.08,14.16,10.83,29.54,9.89,45.65-.27,4.61-1.13,9.19-1.76,13.78a6.08,6.08,0,0,1-2.56,4.26,67.07,67.07,0,0,1-20.76,10.24c-4.93,1.51-10,2-15.09,2.63A275.94,275.94,0,0,1,148.88,240.55Z" /><path d="M189.44,104.8c-.62,13.79-7.09,26.88-21.41,35.23-16.65,9.72-37.26,5.88-49.88-8.85-14.34-16.76-13.9-42.47,1-58.56a39.91,39.91,0,0,1,65.59,9.68C187.84,88.61,189.42,95.27,189.44,104.8Z" /></svg>
        </div>
        <div className="mt-2 flex items-center gap-2 text-xl font-bold md:text-2xl">
          <h1 className=''>@username</h1>
          <RiVerifiedBadgeFill className='text-blue-600 me-auto' />
          <button className="btn btn-square btn-ghost" onClick={() => { setShowQRCode(prev => !prev) }}>
            <IoQrCode className='text-xl md:text-2xl text-info' />
          </button>
        </div>
      </div>
      <div className={`collapse ${showQRCode ? 'collapse-open p-2' : 'collapse-close'}`}>
        <div className="collapse-content">
          <QRCodeProfile />
        </div>
      </div>
    </div>
  )
}

export default UserProfile