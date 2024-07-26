import React from 'react'

import PanelTicketBox from './PanelTicketBox';

import { FaTicket } from "react-icons/fa6";

const UserTicketsPanel = () => {
  return (
    <div className='p-4 flex flex-col h-full'>
      <h2 className="text-2xl font-bold flex items-center gap-2 mb-8 px-6 py-4">
        <FaTicket className='text-amber-500' />
        All my tickets
      </h2>
      <div className="mx-auto">
        <span className="loading loading-lg loading-bars"></span>
      </div>
      {/* for no links in user account component down below will used */}
      {/* <div className="flex items-center justify-center flex-1">
        <div className="flex flex-col items-center justify-center gap-4">
          <span className='text-3xl opacity-35'>¯\_(ツ)_/¯</span>
          <span className='opacity-35'>no ticket found</span>
        </div>
      </div> */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <PanelTicketBox />
        <PanelTicketBox />
        <PanelTicketBox />
        <PanelTicketBox />
      </div>
    </div>
  )
}

export default UserTicketsPanel