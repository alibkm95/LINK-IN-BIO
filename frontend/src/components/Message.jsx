import React from 'react'

import FallbackUserProfile from '../assets/profile.svg'

const Message = ({ message }) => {

  return (
    <div className={`chat ${message.sender.role === 'USER' ? 'chat-start' : 'chat-end'}`}>
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img
            className='bg-white'
            src={message.sender.profileImg ? `/api/file/profile/${message.sender.profileImg}` : FallbackUserProfile} />
        </div>
      </div>
      <div className="chat-header">
        {message.sender.username}
        <time className="text-xs opacity-50"> {new Date(message.createdAt).toLocaleString()}</time>
      </div>
      <div className="chat-bubble">
        <p className='mb-4'>{message.message}</p>
        {
          message.attachment &&
          <a href={`/api/file/attachment/${message.attachment}`} className="btn btn-sm btn-accent">
            Attachment
          </a>
        }
      </div>
      <div className="chat-footer opacity-50">
        {
          message.sender.role === 'USER' ?
            (
              message.seenByAdmin ? 'seen by admins' : 'delivered'
            ) : (
              message.seenByUser ? 'seen by user' : 'delivered'
            )
        }
      </div>
    </div>
  )
}

export default Message