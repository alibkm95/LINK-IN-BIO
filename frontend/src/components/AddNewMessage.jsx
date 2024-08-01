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
          className="input input-bordered w-full"
        />
      </div>
      <div className=" flex items-center gap-1">
        <label htmlFor='attached-file' className='btn btn-square btn-outline btn-accent'>
          <ImAttachment size={25} />
          <input type="file" name="attached-file" id="attached-file" className='hidden' />
        </label>
        <button type="submit" className="btn btn-square btn-outline btn-success">
          <IoSend size={25} />
        </button>
      </div>
    </form>
  )
}

export default AddNewMessage