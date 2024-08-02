import React from 'react'

import { ImAttachment } from "react-icons/im";
import { IoSend } from "react-icons/io5";

const AddNewMessage = () => {
  return (
    <form className='flex items-center gap-1' id='new-message-form'>
      <div className='flex-1'>
        <input
          type="text"
          name='new-message-input'
          placeholder="Type here"
          className="input input-sm input-bordered w-full md:input-md"
        />
      </div>
      <div className=" flex items-center gap-1">
        <label htmlFor='attached-file' className='btn btn-sm btn-square btn-outline btn-accent md:btn-md'>
          <ImAttachment className='md:text-xl' />
          <input type="file" name="attached-file" id="attached-file" className='hidden' />
        </label>
        <button type="submit" className="btn btn-sm btn-square btn-outline btn-success md:btn-md">
          <IoSend className='md:text-xl' />
        </button>
      </div>
    </form>
  )
}

export default AddNewMessage