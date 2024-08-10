import React from 'react'
import { Link } from 'react-router-dom';

import { useMenuStore } from '../context/menuStore';
import { useThemeStore } from '../context/themeStore';

import logo from '../assets/logo.svg'

import { IoClose } from "react-icons/io5";
import { IoHome } from "react-icons/io5";
import { FaLink } from "react-icons/fa";
import { BiSupport } from "react-icons/bi";
import { FaQuestion } from "react-icons/fa";

const SideMenu = () => {

  const { isOpen, closeSideMenu } = useMenuStore()
  const { theme, toggleTheme } = useThemeStore()

  return (
    <div
      className={`fixed z-[99999] w-screen h-screen inset-0 backdrop-blur-sm bg-base-300/25 transition ${isOpen ? 'translate-x-0' : 'translate-x-[-100%]'} ${isOpen ? 'opacity-1' : 'opacity-0'}`}
      onClick={closeSideMenu}
    >
      <div className="bg-base-100 w-full max-w-96 absolute shadow-lg p-4 top-0 bottom-0 left-0 flex flex-col gap-2 overflow-y-auto">
        <div className="ms-auto">
          <button className="btn btn-square rounded" onClick={closeSideMenu}>
            <IoClose size={25} />
          </button>
        </div>
        <div>
          <Link
            to='/'
            className='w-full p-1 border-none flex items-center gap-2 hover:drop-shadow-md transition'
          >
            <img src={logo} className='block w-16 h-16' alt="" />
            <span className='text-3xl font-bold'>Link-In-Bio</span>
          </Link>
        </div>
        <div className="divider p-0 m-0"></div>
        <ul className="menu flex flex-col gap-2">
          <li className='text-xl'>
            <Link to='/' onClick={closeSideMenu}>
              <IoHome /> Home
            </Link>
          </li>
          <li className='text-xl'>
            <Link to='/panel?AS=newLink' onClick={closeSideMenu}>
              <FaLink /> New link
            </Link>
          </li>
          <li className='text-xl'>
            <Link to='/ticket' onClick={closeSideMenu}>
              <BiSupport /> Support
            </Link>
          </li>
          <li className='text-xl'>
            <Link to='/guide' onClick={closeSideMenu}>
              <FaQuestion /> Guidelines
            </Link>
          </li>
          <div className="divider p-0 m-0"></div>
          <li className='text-xl'>
            <label className="flex cursor-pointer gap-2">
              <span className='me-auto inline-block'>Switch theme</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round">
                <circle cx="12" cy="12" r="5" />
                <path
                  d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
              </svg>
              <input name='sidebar-theme-input' type="checkbox" value="synthwave" className="toggle theme-controller" onChange={toggleTheme} checked={theme === 'cupcake' ? false : true} />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
              </svg>
            </label>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default SideMenu