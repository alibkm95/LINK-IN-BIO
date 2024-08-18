import React from 'react'
import { Link } from 'react-router-dom'

const PanelTicketBox = ({ data }) => {
  return (
    <div className='p-4 bg-base-300 rounded-box shadow-md'>
      <div className="flex items-end">
        <div className="flex-1">
          <h4 className="text-xl font-semibold">
            {data.subject}
          </h4>
          <div className="flex items-center gap-2 mt-4">
            <span>{new Date(data.createdAt).toLocaleDateString()}</span>
            {
              data.ticketStatus === 'pending' &&
              <div className="badge badge-md badge-warning">pending</div>
            }
            {
              data.ticketStatus === 'answered' &&
              <div className="badge badge-md badge-success">answered</div>
            }
            {
              data.ticketStatus === 'closed' &&
              <div className="badge badge-md badge-error">closed</div>
            }
          </div>
        </div>
        <div>
          <Link to={`/t/${data._id}`} className='btn btn-sm bg-emerald-600 text-white hover:bg-emerald-700'>
            Detailes
          </Link>
        </div>
      </div>
    </div>
  )
}

export default PanelTicketBox