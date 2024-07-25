import React from 'react'

import Notification from './Notification';

import { FaBell } from "react-icons/fa";

const UserNotifications = () => {

  return (
    <div className='p-4 flex flex-col h-full'>
      <h2 className="text-2xl font-bold flex items-center gap-2 mb-8 px-6 py-4">
        <FaBell className='text-amber-500' />
        Notifications
      </h2>
      <div className="mx-auto">
        <span className="loading loading-lg loading-bars"></span>
      </div>
      {/* for no links in user account component down below will used */}
      {/* <div className="flex items-center justify-center flex-1">
        <div className="flex flex-col items-center justify-center gap-4">
          <span className='text-3xl opacity-35'>¯\_(ツ)_/¯</span>
          <span className='opacity-35'>🎉 no notification. 🎉</span>
        </div>
      </div> */}
      <div className="flex flex-col gap-2">
        <Notification />
        <Notification />
        <Notification />
        <Notification />
      </div>
    </div>
  )
}

export default UserNotifications