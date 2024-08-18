import React, { useState } from 'react'
import useNotification from '../hooks/useNotification'

const Notification = ({ notif, removeCompleted }) => {

  const { loading, removeNotification } = useNotification()
  const [showMessage, setShowMessage] = useState(false)

  const handleRemove = async () => {
    const { success } = await removeNotification(notif._id)

    if (success) removeCompleted()
  }

  return (
    <div className="bg-base-300 rounded-box shadow-md">
      <div role="alert" className="alert bg-base-300 border-none">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          className="stroke-info h-6 w-6 shrink-0">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
        <span>{notif.subject}</span>
        <div>
          <button className="btn btn-sm btn-primary ms-1" onClick={() => setShowMessage(prev => !prev)}>
            {showMessage ? 'Hide' : 'Show'}
          </button>
          <button className="btn btn-sm btn-error ms-1" onClick={handleRemove}>
            Remove
            {
              loading &&
              <span className="loading loading-spinner loading-sm"></span>
            }
          </button>
        </div>
      </div>
      <div className={`collapse ${showMessage ? 'collapse-open' : ''}`}>
        <div className="collapse-content">
          <p>
            {notif.message}
          </p>
        </div>
      </div>
    </div>
  )
}

export default Notification