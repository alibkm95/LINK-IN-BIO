import React, { useEffect } from 'react'

import PanelTicketBox from './PanelTicketBox';

import { FaTicket } from "react-icons/fa6";
import useTicketStore from '../context/ticketStore';

const UserTicketsPanel = () => {

  const { loading, getUserTickets, userTickets } = useTicketStore()

  useEffect(() => {
    getUserTickets()
  }, [])

  return (
    <div className='p-4 flex flex-col h-full'>
      <h2 className="text-2xl font-bold flex items-center gap-2 mb-8 px-6 py-4">
        <FaTicket className='text-amber-500' />
        All my tickets
      </h2>
      {
        loading &&
        <div className="mx-auto">
          <span className="loading loading-lg loading-bars"></span>
        </div>
      }
      {
        !loading && userTickets.length === 0 &&
        <div className="flex items-center justify-center flex-1">
          <div className="flex flex-col items-center justify-center gap-4">
            <span className='text-3xl opacity-35'>¯\_(ツ)_/¯</span>
            <span className='opacity-35'>no ticket found!!</span>
          </div>
        </div>
      }
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {
          userTickets.length > 0 &&
          userTickets.map(ticket => (
            <PanelTicketBox key={ticket._id} data={ticket} />
          ))
        }
      </div>
    </div>
  )
}

export default UserTicketsPanel