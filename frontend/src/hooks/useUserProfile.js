import React, { useState } from 'react'

const useUserProfile = () => {

  const [loading, setLoading] = useState(false)
  const [profileData, setProfileData] = useState(null)

  const getProfile = async (username) => {
    setLoading(true)

    const res = await fetch(`/api/user/profile/${username}`)
    const data = await res.json()

    if (res.status === 200) {
      setLoading(false)
      return setProfileData(data)
    }

    setLoading(false)
    return setProfileData(null)
  }

  return { loading, profileData, getProfile }
}

export default useUserProfile