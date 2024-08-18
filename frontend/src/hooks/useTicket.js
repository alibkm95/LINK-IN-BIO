import React, { useState } from 'react'
import toast from 'react-hot-toast'

const useTicket = () => {

  const [loading, setLoading] = useState(false)


  const createTicket = async ({ subject, message }) => {
    setLoading(true)

    if (!subject.length || !message.length) {
      setLoading(false)
      toast.error('required fields are empty!')
      return { success: false }
    }

    const res = await fetch('/api/ticket', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ subject, message })
    })

    const data = await res.json()

    if (res.status === 201) {
      setLoading(false)
      toast.success(data.msg)
      return { success: true }
    }

    setLoading(false)
    toast.error(data.msg)
    return { success: true }
  }

  return { loading, createTicket }
}

export default useTicket