import React, { useEffect, useState, useRef } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { useThemeStore } from './context/themeStore'

import MainLayout from './components/layouts/MainLayout'
import AdminLayout from './components/layouts/AdminLayout'

import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Recover from './pages/Recover'
import Conversation from './pages/Conversation'
import Panel from './pages/Panel'
import Profile from './pages/Profile'
import Redirect from './pages/Redirect'
import Support from './pages/Support'
import Guide from './pages/Guide'

import AdminHome from './pages/admin/AdminHome'
import LinkDetailes from './pages/admin/LinkDetailes'
import Links from './pages/admin/Links'
import ReportDetailes from './pages/admin/ReportDetailes'
import Reports from './pages/admin/Reports'
import TicketDetailes from './pages/admin/TicketDetailes'
import Tickets from './pages/admin/Tickets'
import Users from './pages/admin/Users'
import UserDetailes from './pages/admin/UserDetailes'

const App = () => {

  const location = useLocation()
  const scrollRef = useRef(null)
  const { theme } = useThemeStore()

  useEffect(() => {
    document.querySelector('html').setAttribute('data-theme', theme)
  }, [theme])

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: 0, behavior: 'smooth' })
  }, [location])

  return (
    <div ref={scrollRef}>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/recover' element={<Recover />} />
          <Route path='/panel' element={<Panel />} />
          <Route path='/guide' element={<Guide />} />
          <Route path='/u/:username' element={<Profile />} />
          <Route path='/r/:short' element={<Redirect />} />
          <Route path='/ticket' element={<Support />} />
          <Route path='/t/:ticketId' element={<Conversation />} />
        </Route>
        <Route element={<AdminLayout />}>
          <Route path='/admin' element={<AdminHome />} />
          <Route path='/admin/links' element={<Links />} />
          <Route path='/admin/li/:linkId' element={<LinkDetailes />} />
          <Route path='/admin/reports' element={<Reports />} />
          <Route path='/admin/r/:reportId' element={<ReportDetailes />} />
          <Route path='/admin/tickets' element={<Tickets />} />
          <Route path='/admin/t/:ticketId' element={<TicketDetailes />} />
          <Route path='/admin/users' element={<Users />} />
          <Route path='/admin/u/:userId' element={<UserDetailes />} />
        </Route>
        {/* global not found here */}
        {/* global toaster here */}
      </Routes>
    </div>
  )
}

export default App