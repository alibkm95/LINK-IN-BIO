import React from 'react'

import { BsChatRightTextFill } from "react-icons/bs";
import { BsFillFileTextFill } from "react-icons/bs";

const ReportLinkForm = () => {
  return (
    <form name='report-form' className='flex flex-col gap-4'>
      <label className="form-control w-full">
        <div className="label">
          <span className="label-text flex items-center gap-1">
            <BsChatRightTextFill className='text-primary' />
            Issue:
          </span>
        </div>
        <input
          name='title-report'
          type="text"
          placeholder='Issue title...'
          className="input input-sm input-bordered w-full"
        />
      </label>
      <label className="form-control">
        <div className="label">
          <span className="label-text flex items-center gap-1">
            <BsFillFileTextFill className='text-primary' />
            Desrciptions:
          </span>
        </div>
        <textarea
          className="textarea textarea-bordered h-24"
          placeholder="Describe issues with the link..."
          name='desc-report'
        ></textarea>
      </label>
      <div>
        <button type='submit' className="btn btn-sm text-white bg-emerald-500 hover:bg-emerald-600 ms-2">
          Submit
        </button>
        <button type='button' className="btn btn-sm text-white bg-red-500 hover:bg-red-600 ms-2">
          Cancle
        </button>
      </div>
    </form>
  )
}

export default ReportLinkForm