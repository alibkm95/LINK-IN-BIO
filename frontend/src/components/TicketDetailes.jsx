import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import useTicketStore from '../context/ticketStore'

const TicketDetailes = () => {

  const { ticket } = useTicketStore()

  return (
    <div className="sticky top-0 bg-base-200 p-4 rounded-box shadow-md">
      <ul>
        <li className='text-lg font-semibold'>
          Subject:
        </li>
        <li className='ps-2 mb-3'>
          {ticket.subject}
        </li>
        <li className='text-lg font-semibold'>
          Created at:
        </li>
        <li className='ps-2 mb-3'>
          {new Date(ticket.createdAt).toLocaleDateString()}
        </li>
        <li className='text-lg font-semibold'>
          Last update:
        </li>
        <li className='ps-2 mb-3'>
          {new Date(ticket.updatedAt).toLocaleDateString()}
        </li>
        <li className='text-lg font-semibold'>
          Status:
        </li>
        <li className='ps-2 mb-3'>
          {
            ticket.ticketStatus === 'pending' &&
            <div className="badge badge-md badge-warning">pending</div>
          }
          {
            ticket.ticketStatus === 'answered' &&
            <div className="badge badge-md badge-success">answered</div>
          }
          {
            ticket.ticketStatus === 'closed' &&
            <div className="badge badge-md badge-error">closed</div>
          }
        </li>
        <li>
          <Link to='/ticket' className='btn btn-secondary w-full max-w-72'>
            Open new ticket
          </Link>
        </li>
      </ul>
    </div>
  )
}

export default TicketDetailes