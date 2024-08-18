import React, { useEffect, useRef, useState } from 'react'
import { useThemeStore } from '../context/themeStore'
import { useUserStore } from '../context/userStore';
import useLogout from '../hooks/useLogout';

import { Link } from 'react-router-dom'

import { FaBell } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { FaLink } from "react-icons/fa";
import { FaUnlink } from "react-icons/fa";
import { RiProfileFill } from "react-icons/ri";
import { MdSpaceDashboard } from "react-icons/md";
import { MdAddBox } from "react-icons/md";
import { FaArrowRightFromBracket } from "react-icons/fa6";
import { FaArrowRightToBracket } from "react-icons/fa6";
import { TiUserAdd } from "react-icons/ti";

const UserActions = () => {

  const { theme, toggleTheme } = useThemeStore()
  const { authUser, userStats, fetchUserStats } = useUserStore()
  const { loading, logout } = useLogout()
  const [isLoading, setIsLoading] = useState(false)
  const dropdownRef = useRef(null)

  useEffect(() => {
    if (authUser) {
      setIsLoading(true)
      fetchUserStats()
    }
  }, [authUser])

  useEffect(() => {
    if (userStats) {
      setIsLoading(false)
    }
  }, [userStats])

  const handleLogout = () => {
    if (!authUser) return
    logout()
  }

  return (
    <div className='flex items-center gap-2 pe-4 lg:gap-4'>
      <div>
        <label className="swap swap-rotate btn btn-ghost btn-square rounded-full">
          <input name='theme-input' type="checkbox" className="theme-controller" value="synthwave" onChange={toggleTheme} checked={theme === 'cupcake' ? true : false} />
          <svg
            className="swap-off h-10 w-10 fill-current"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24">
            <path
              d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
          </svg>
          <svg
            className="swap-on h-10 w-10 fill-current"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24">
            <path
              d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
          </svg>
        </label>
      </div>
      <div>
        <Link to='/panel?AS=notifications'>
          <div className="indicator">
            {
              userStats && userStats.notifCount > 0 && <span className="indicator-item badge badge-sm badge-error top-2 right-2">{userStats.notifCount}</span>
            }
            <button className="btn btn-square btn-ghost rounded-full">
              <FaBell size={30} />
            </button>
          </div>
        </Link>
      </div>
      <div className='flex items-center justify-center'>
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle" ref={dropdownRef}>
            <div className="avatar">
              {
                authUser && authUser.profileImg ?
                  (<div className="mask mask-squircle w-12 md:w-14">
                    <img src={`/api/file/profile/${authUser.profileImg}`} />
                  </div>)
                  :
                  (<FaUser size={30} />)
              }
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-200 rounded-box z-[1] mt-3 w-52 p-2 shadow">
            {
              !authUser &&
              <>
                <li>
                  <Link to='/login' className='btn btn-primary btn-sm rounded-box my-1'>
                    <FaArrowRightToBracket />
                    Login
                  </Link>
                </li>
                <li>
                  <Link to='/signup' className='btn btn-secondary btn-sm rounded-box'>
                    <TiUserAdd />
                    Signup
                  </Link>
                </li>
              </>
            }
            {
              authUser &&
              <>
                <li>
                  <Link to='/panel' className='flex flex-col gap-2 rounded-box'>
                    <span className='text-lg font-bold'>@{authUser.username}</span>
                    <span className='text-xs'>{authUser.email}</span>
                    <div className="w-full flex items-center justify-evenly mt-2">
                      {
                        isLoading && <span className="loading loading-spinner loading-md mx-auto"></span>
                      }
                      {
                        userStats &&
                        <>
                          <div className='flex flex-col gap-1 items-center justify-center tooltip' data-tip='Active links'>
                            <FaLink className='text-emerald-500' />
                            {userStats.activeLinks}
                          </div>
                          <div className='flex flex-col gap-1 items-center justify-center tooltip' data-tip='Disabled links'>
                            <FaUnlink className='text-red-500' />
                            {userStats.deactiveLinks}
                          </div>
                          <div className='flex flex-col gap-1 items-center justify-center tooltip' data-tip='New notifications'>
                            <FaBell className='text-amber-500' />
                            {userStats.notifCount}
                          </div>
                        </>
                      }
                    </div>
                  </Link>
                </li>
                <div className="divider m-0"></div>
                <li>
                  <Link to={`/u/${authUser.username}`} className='rounded-box'>
                    <RiProfileFill size={25} />
                    profile
                  </Link>
                </li>
                <li>
                  <Link to='/panel' className='rounded-box'>
                    <MdSpaceDashboard size={25} />
                    panel
                  </Link>
                </li>
                <li>
                  <Link to='/panel?AS=newLink' className='rounded-box'>
                    <MdAddBox size={25} />
                    add new link
                  </Link>
                </li>
                <div className="divider m-0"></div>
                <li>
                  <button
                    className="rounded-box btn btn-sm btn-error flex items-center gap-2"
                    onClick={handleLogout}
                  >
                    <FaArrowRightFromBracket />
                    logout
                    {
                      loading && <span className="loading loading-spinner loading-sm"></span>
                    }
                  </button>
                </li>
              </>
            }
          </ul>
        </div>
      </div>
    </div>
  )
}

export default UserActions