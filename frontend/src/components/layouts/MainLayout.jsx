import React from 'react'
import { Outlet } from 'react-router-dom'

import Navbar from '../Navbar'

const MainLayout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      {/* main footer here */}
    </>
  )
}

export default MainLayout