import React from 'react'
import QRCodeProfile from './QRCodeProfile'

import FallbackProfile from '../assets/profile.svg'

const Phone = ({ user }) => {
  return (
    <div className='mx-auto sticky top-0'>
      <div className="mockup-phone border-primary">
        <div className="camera"></div>
        <div className="display">
          <div className="artboard artboard-demo phone-1">
            <div className="w-full h-full flex flex-col items-center justify-center gap-3">
              <div className="bg-base-100 w-16 h-16 rounded-full overflow-hidden md:w-24 md:h-24">
                <img className='w-full bg-white' src={user.profileImg ? `/api/file/profile/${user.profileImg}` : FallbackProfile} />
              </div>
              <p className="text-xl font-bold">
                @{user.username}
              </p>
              <QRCodeProfile user={user} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Phone