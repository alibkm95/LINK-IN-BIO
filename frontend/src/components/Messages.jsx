import React from 'react'
import Message from './Message'
import AddNewMessage from './AddNewMessage'
import useTicketStore from '../context/ticketStore'

const Messages = () => {

  const { loading, ticket } = useTicketStore()
  
  return (
    <div className='bg-base-200 p-4 rounded-box shadow-md min-h-screen flex flex-col gap-2'>
      <div className="flex-1">
        {
          ticket.conversations.map(conversation => (
            <Message key={conversation._id} message={conversation} />
          ))
        }
      </div>
      <div className="divider m-0"></div>
      <div>
        <AddNewMessage />
      </div>
    </div>
  )
}

export default Messages