import React from 'react'

import { Link } from 'react-router-dom'

import QRCodeProfile from './QRCodeProfile';

import { FaCircleUser } from "react-icons/fa6";
import { MdAddBox } from "react-icons/md";
import { FaLink } from "react-icons/fa";
import { FaBell } from "react-icons/fa";
import { FaTicketAlt } from "react-icons/fa";
import { MdOutlineLogout } from "react-icons/md";
import { RiAdminFill } from "react-icons/ri";

const ControlPanel = ({ activeSection }) => {
  return (
    <aside className="bg-base-200 rounded-box p-4 shadow-lg sticky top-0 flex flex-col max-w-xl mx-auto gap-2">
      <div>
        <div className='flex flex-col items-center gap-1' >
          <span className='text-xl font-bold'>@username</span>
          <span className='text-sm'>sample@email.com</span>
          <div className='mt-2'>
            <QRCodeProfile />
          </div>
        </div>
      </div>
      <div className="divider my-0"></div>
      <ul className='flex flex-col gap-2'>
        <li>
          <Link
            to='/admin'
            className='flex items-center justify-start gap-2 btn btn-sm btn-ghost text-lg'
          >
            <RiAdminFill />
            Admin dashboard
          </Link>
        </li>
        <li>
          <Link
            to='/panel?AS=account'
            className={`flex items-center justify-start gap-2 btn btn-sm text-lg ${activeSection === 'account' ? 'glass bg-emerald-600 text-white hover:text-base-content' : 'btn-ghost'}`}
          >
            <FaCircleUser />
            My Account
          </Link>
        </li>
        <li>
          <Link
            to='/panel?AS=newLink'
            className={`flex items-center justify-start gap-2 btn btn-sm text-lg ${activeSection === 'newLink' ? 'glass bg-emerald-600 text-white hover:text-base-content' : 'btn-ghost'}`}
          >
            <MdAddBox />
            Add New Link
          </Link>
        </li>
        <li>
          <Link
            to='/panel?AS=myLinks'
            className={`flex items-center justify-start gap-2 btn btn-sm text-lg ${activeSection === 'myLinks' ? 'glass bg-emerald-600 text-white hover:text-base-content' : 'btn-ghost'}`}
          >
            <FaLink />
            My Links
          </Link>
        </li>
        <li>
          <Link
            to='/panel?AS=notifications'
            className={`flex items-center justify-start gap-2 btn btn-sm text-lg ${activeSection === 'notifications' ? 'glass bg-emerald-600 text-white hover:text-base-content' : 'btn-ghost'}`}
          >
            <FaBell />
            Notifications
          </Link>
        </li>
        <li>
          <Link
            to='/panel?AS=tickets'
            className={`flex items-center justify-start gap-2 btn btn-sm text-lg ${activeSection === 'tickets' ? 'glass bg-emerald-600 text-white hover:text-base-content' : 'btn-ghost'}`}
          >
            <FaTicketAlt />
            My Tickets
          </Link>
        </li>
      </ul>
      <div className="divider my-0"></div>
      <div>
        <button
          className="flex items-center justify-start gap-2 btn btn-sm btn-error text-white text-lg w-full"
        >
          <MdOutlineLogout />
          Logout
        </button>
      </div>
    </aside>
  )
}

export default ControlPanel