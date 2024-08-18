import React, { useState } from 'react'

const useNotification = () => {

  const [loading, setLoading] = useState(false)
  const [notifications, setNotifications] = useState([])

  const getNotifications = async () => {
    setLoading(true)

    const res = await fetch('api/notif')
    const data = await res.json()

    if (res.status === 200) {
      setLoading(false)
      return setNotifications(data.notifications)
    }

    setLoading(false)
    return setNotifications([])
  }

  const removeNotification = async (notifId) => {
    setLoading(true)

    const res = await fetch(`api/notif/${notifId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" }
    })

    const data = await res.json()

    if (res.status === 200) {
      setLoading(false)
      return { success: true }
    }

    setLoading(false)
    return { success: false }
  }

  return { loading, notifications, getNotifications, removeNotification }
}

export default useNotification