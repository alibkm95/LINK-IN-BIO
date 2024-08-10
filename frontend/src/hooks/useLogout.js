import React, { useState } from 'react'
import { useUserStore } from '../context/userStore'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

const useLogout = () => {
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const { setAuthUser } = useUserStore()

  const logout = async () => {
    setLoading(true)
    const res = await fetch('/api/auth/logout', {
      method: "DELETE",
      headers: { "Content-Type": "application/json" }
    })

    const data = await res.json()

    if (res.status === 200) {
      setAuthUser(null)
      setLoading(false)
      navigate('/')
      return toast.success(data.msg)
    }

    toast.error(data.msg)
    return setLoading(false)
  }

  return { loading, logout }
}

export default useLogout