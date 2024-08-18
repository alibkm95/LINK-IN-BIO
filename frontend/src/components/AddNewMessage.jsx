import React, { useState } from 'react'

import { ImAttachment } from "react-icons/im";
import { IoSend } from "react-icons/io5";
import useTicketStore from '../context/ticketStore';

const AddNewMessage = () => {

  const { loading, ticket, addNewMessage } = useTicketStore()
  const [message, setMessage] = useState('')
  const [file, setFile] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()

    await addNewMessage({
      ticketId: ticket._id,
      message,
      file
    })
  }

  return (
    <form className='flex items-center gap-1' id='new-message-form' onSubmit={e => { handleSubmit(e) }}>
      <div className='flex-1'>
        <input
          type="text"
          name='new-message-input'
          placeholder="Type here"
          className="input input-sm input-bordered w-full md:input-md"
          value={message}
          onChange={e => { setMessage(e.target.value) }}
        />
      </div>
      <div className=" flex items-center gap-1">
        <label htmlFor='attached-file' className={`btn btn-sm btn-square ${!file ? 'btn-outline' : 'text-white'} btn-accent md:btn-md`}>
          <ImAttachment className='md:text-xl' />
          <input
            type="file"
            name="attached-file"
            id="attached-file"
            className='hidden'
            onChange={e => { setFile(e.target.files[0] ? e.target.files[0] : null) }}
          />
        </label>
        <button type="submit" className="btn btn-sm btn-square btn-outline btn-success md:btn-md">
          {
            loading ?
              (
                <span className="loading loading-spinner text-success loading-sm md:loading-md"></span>
              ) : (
                <IoSend className='md:text-xl' />
              )
          }
        </button>
      </div>
    </form>
  )
}

export default AddNewMessage