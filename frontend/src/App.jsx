import React, { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { useThemeStore } from './context/themeStore'
import { animateScroll } from 'react-scroll'
import './App.css'

import Navbar from './components/Navbar'
import Footer from './components/Footer'
import GlobalNotFound from './pages/GlobalNotFound'

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
import UserLinkStats from './pages/UserLinkStats'

const App = () => {

  const location = useLocation()
  const { theme } = useThemeStore()

  useEffect(() => {
    document.querySelector('html').setAttribute('data-theme', theme)
  }, [theme])

  // todo => later move scrolling stuff to each page in the vigual
  useEffect(() => {
    animateScroll.scrollToTop({ duration: 500, smooth: true })
  }, [location])

  return (
    <div>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/recover' element={<Recover />} />
        <Route path='/panel' element={<Panel />} />
        <Route path='/guide' element={<Guide />} />
        <Route path='/stats/:linkId' element={<UserLinkStats />} />
        <Route path='/u/:username' element={<Profile />} />
        <Route path='/r/:short' element={<Redirect />} />
        <Route path='/ticket' element={<Support />} />
        <Route path='/t/:ticketId' element={<Conversation />} />
        <Route path='*' element={<GlobalNotFound />} />
      </Routes>
      {/* global toaster here */}
      <Footer />
    </div>
  )
}

export default App