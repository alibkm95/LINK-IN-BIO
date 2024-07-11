import React from 'react'
import { Outlet } from 'react-router-dom'

const AdminLayout = () => {
  return (
    <>
      {/* admin navigation here */}
      <Outlet />
    </>
  )
}

export default AdminLayout