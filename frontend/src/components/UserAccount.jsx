import React from 'react'
import UserProfile from '../components/UserProfile'
import AccountUpdateForm from './AccountUpdateForm'
import { useUserStore } from '../context/userStore'

const UserAccount = () => {

  const { authUser } = useUserStore()

  return (
    <div>
      <UserProfile user={authUser} />
      <AccountUpdateForm />
    </div>
  )
}

export default UserAccount