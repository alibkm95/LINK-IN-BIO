import React, { useEffect, useState } from 'react'
import { useUserStore } from '../context/userStore';

import useNotification from '../hooks/useNotification';
import Notification from './Notification';

import { FaBell } from "react-icons/fa";

const UserNotifications = () => {

  const { userStats, setUserStats } = useUserStore()
  const { loading, notifications, getNotifications } = useNotification()
  const [refetch, setRefetch] = useState(false)

  useEffect(() => {
    setUserStats({ ...userStats, notifCount: 0 })
    getNotifications()
  }, [refetch])

  return (
    <div className='p-4 flex flex-col h-full'>
      <h2 className="text-2xl font-bold flex items-center gap-2 mb-8 px-6 py-4">
        <FaBell className='text-amber-500' />
        Notifications
      </h2>
      {
        loading &&
        <div className="mx-auto">
          <span className="loading loading-lg loading-bars"></span>
        </div>
      }
      {
        !loading && notifications.length === 0 &&
        <div className="flex items-center justify-center flex-1">
          <div className="flex flex-col items-center justify-center gap-4">
            <span className='text-3xl opacity-35'>¯\_(ツ)_/¯</span>
            <span className='opacity-35'>🎉 no notification. 🎉</span>
          </div>
        </div>
      }
      <div className="flex flex-col gap-2">
        {
          notifications.length > 0 &&
          notifications.map(notif => (
            <Notification key={notif._id} notif={notif} removeCompleted={() => setRefetch(prev => !prev)} />
          ))
        }
      </div>
    </div>
  )
}

export default UserNotifications