import React, { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { useThemeStore } from './context/themeStore'
import { Toaster } from 'react-hot-toast'
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
import { useUserStore } from './context/userStore'

const App = () => {

  const { authUser, fetchLoggedInUser } = useUserStore()
  const { theme } = useThemeStore()

  useEffect(() => {
    document.querySelector('html').setAttribute('data-theme', theme)
  }, [theme])

  useEffect(() => {
    fetchLoggedInUser()
  }, [])

  return (
    <div>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={!authUser ? <Login /> : <Panel />} />
        <Route path='/signup' element={!authUser ? <Signup /> : <Panel />} />
        <Route path='/recover' element={!authUser ? <Recover /> : <Panel />} />
        <Route path='/panel' element={authUser ? <Panel /> : <Login />} />
        <Route path='/guide' element={<Guide />} />
        <Route path='/stats/:linkId' element={authUser ? <UserLinkStats /> : <Login />} />
        <Route path='/u/:username' element={<Profile />} />
        <Route path='/r/:short' element={<Redirect />} />
        <Route path='/ticket' element={<Support />} />
        <Route path='/t/:ticketId' element={authUser ? <Conversation /> : <Login />} />
        <Route path='*' element={<GlobalNotFound />} />
      </Routes>
      <Footer />
      <Toaster
        toastOptions={{ className: 'bg-base-100 text-base-content border border-base-content/30' }}
        position='top-left'
      />
    </div>
  )
}

export default App