import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import SideMenu from './SideMenu';
import UserActions from './UserActions';

import { useMenuStore } from '../context/menuStore'

import logo from '../assets/logo.svg'

import { RiMenu3Fill } from "react-icons/ri";
import { IoHome } from "react-icons/io5";
import { FaLink } from "react-icons/fa";
import { BiSupport } from "react-icons/bi";
import { FaQuestion } from "react-icons/fa";

const Navbar = () => {

  const { openSideMenu } = useMenuStore()

  return (
    <header className='bg-base-300 lg:m-2 lg:rounded-box'>
      <nav className="flex items-center max-w-7xl mx-auto p-2 gap-2 lg:gap-4 lg:px-8">
        <div className="flex items-center">
          <div className="lg:hidden">
            <button className="btn btn-ghost btn-square rounded p-1" onClick={openSideMenu}>
              <RiMenu3Fill size={25} />
            </button>
            <SideMenu />
          </div>
          <div className="">
            <Link to='/' className='w-16 h-16 btn p-1 bg-transparent border-none lg:w-20 lg:h-20 hover:bg-transparent'>
              <img src={logo} alt="" />
            </Link>
          </div>
        </div>
        <div className="flex-1">
          <div className="hidden lg:block">
            <ul className="menu flex flex-row gap-2">
              <li className='text-xl'>
                <Link to='/'>
                  <IoHome /> Home
                </Link>
              </li>
              <li className='text-xl'>
                <Link to='/panel?AS=newLink'>
                  <FaLink /> New link
                </Link>
              </li>
              <li className='text-xl'>
                <Link to='/ticket'>
                  <BiSupport /> Support
                </Link>
              </li>
              <li className='text-xl'>
                <Link to='/guide'>
                  <FaQuestion /> How to use
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div>
          <UserActions />
        </div>
      </nav>
    </header>
  )
}

export default Navbar