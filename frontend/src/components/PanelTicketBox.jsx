import React from 'react'
import { Link } from 'react-router-dom'

const PanelTicketBox = () => {
  return (
    <div className='p-4 bg-base-300 rounded-box shadow-md'>
      <div className="flex items-end">
        <div className="flex-1">
          <h4 className="text-xl font-semibold">
            Ticket subject
          </h4>
          <div className="flex items-center gap-2 mt-4">
            <span>2024/7/18</span>
            <div className="badge badge-sm badge-success">answered</div>
            {/* <div className="badge badge-sm badge-error">closed</div>
            <div className="badge badge-sm badge-warning">pending</div> */}
          </div>
        </div>
        <div className="">
          <Link to='/t/ticketId' className='btn btn-sm bg-emerald-600 text-white hover:bg-emerald-700'>
            Detailes
          </Link>
        </div>
      </div>
    </div>
  )
}

export default PanelTicketBox