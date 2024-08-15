import React, { useState } from 'react'
import { useUserStore } from '../context/userStore'
import toast from 'react-hot-toast'

const useUserUpdate = () => {

  const [loading, setLoading] = useState(false)
  const { setAuthUser } = useUserStore()

  const updateUser = async (userNewInfos) => {
    setLoading(true)

    const formData = new FormData()

    if (!userNewInfos.username) {
      toast.error('User name can not be empty!')
      return
    }

    formData.append('username', userNewInfos.username.toLowerCase().trim())
    formData.append('bio', userNewInfos.bio)

    if (userNewInfos.oldPassword && userNewInfos.newPassword) {
      const isNewPasswordValid = validateNewPassword(userNewInfos.newPassword)

      if (isNewPasswordValid) {
        formData.append('newPassword', userNewInfos.newPassword)
        formData.append('oldPassword', userNewInfos.oldPassword)
      }
    }

    if (userNewInfos.profileImg) {
      formData.append('profileImg', userNewInfos.profileImg)
    }

    if (userNewInfos.coverImg) {
      formData.append('coverImg', userNewInfos.coverImg)
    }

    const res = await fetch('/api/user', {
      method: "PATCH",
      body: formData
    })

    const data = await res.json()

    if (res.status === 200) {
      setLoading(false)
      setAuthUser(data.user)
      return toast.success('User updated successfully!')
    }

    setLoading(false)
    toast.error(data.msg)
  }

  return { loading, updateUser }
}

const validateNewPassword = (pass) => {
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;

  if (!passwordRegex.test(pass)) {
    toast.error('new Password is not in the valid format. \n+ password must be at least 8 characters. \n+ password must contain one uppercase letter. \n+ password must contain one lowercase letter. \n+ password must contain one number')
    return false
  }

  return true
}

export default useUserUpdate