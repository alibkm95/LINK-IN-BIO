import React from 'react'
import { Link } from 'react-router-dom'

const TicketDetailes = () => {
  return (
    <div className="sticky top-0 bg-base-200 p-4 rounded-box shadow-md">
      <ul>
        <li className='text-lg font-semibold'>
          Subject:
        </li>
        <li className='ps-2 mb-3'>
          the subject of ticket
        </li>
        <li className='text-lg font-semibold'>
          Created at:
        </li>
        <li className='ps-2 mb-3'>
          2024/10/18
        </li>
        <li className='text-lg font-semibold'>
          Last update:
        </li>
        <li className='ps-2 mb-3'>
          2024/10/25
        </li>
        <li className='text-lg font-semibold'>
          Status:
        </li>
        <li className='ps-2 mb-3'>
          <div className="badge badge-success">answered</div>
          <div className="badge badge-warning">pending</div>
          <div className="badge badge-error">closed</div>
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