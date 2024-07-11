import React from 'react'
import { Outlet } from 'react-router-dom'

const MainLayout = () => {
  return (
    <>
      {/* main navigation here */}
      <Outlet />
      {/* main footer here */}
    </>
  )
}

export default MainLayout