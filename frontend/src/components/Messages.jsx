import React from 'react'
import Message from './Message'
import AddNewMessage from './AddNewMessage'

const Messages = () => {
  return (
    <div className='bg-base-200 p-4 rounded-box shadow-md min-h-screen flex flex-col gap-2'>
      <div className="flex-1">
        <Message isAdmin={true} />
        {/* <Message isAdmin={false} />
        <Message isAdmin={true} />
        <Message isAdmin={false} />
        <Message isAdmin={true} /> */}
      </div>
      <div className="divider m-0"></div>
      <div>
        <AddNewMessage />
      </div>
    </div>
  )
}

export default Messages