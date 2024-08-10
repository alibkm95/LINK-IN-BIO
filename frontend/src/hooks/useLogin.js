import React, { useState } from 'react'
import { useUserStore } from '../context/userStore'
import toast from 'react-hot-toast'

const useLogin = () => {

  const [loading, setLoading] = useState(false)
  const { setAuthUser } = useUserStore()

  const login = async ({ email, password }) => {
    const isValid = validateInputs({ email, password })

    if (!isValid) return { success: false }

    setLoading(true)

    const res = await fetch('/api/auth/login', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    })

    const data = await res.json()

    if (res.status === 200) {
      setAuthUser(data.user)
      setLoading(false)
      toast.success('Login success.')
      return { success: true }
    }

    setLoading(false)
    toast.error(data.msg)
    return { success: false }
  }

  return { loading, login }
}

const validateInputs = ({ email, password }) => {
  if (!email.length || !password.length) {
    toast.error('Please fill all the fields!')
    return false
  }

  return true
}

export default useLogin