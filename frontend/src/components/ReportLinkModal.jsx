import React from 'react'

import { BsChatRightTextFill } from "react-icons/bs";
import { BsFillFileTextFill } from "react-icons/bs";

const ReportLinkModal = () => {
  return (
    <dialog
      id="loginAlertModal"
      className="modal modal-open modal-bottom sm:modal-middle"
    >
      <div className="modal-box">
        <h3 className="font-bold text-lg text-center">Reporting link issues and rule violation by links</h3>
        <div className="modal-action justify-center">
          <div className='w-full'>
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
                <button
                  type='submit'
                  className="btn btn-sm text-white bg-emerald-500 hover:bg-emerald-600 ms-2"
                >
                  Report
                </button>
                <button
                  type='button'
                  className="btn btn-sm text-white bg-red-500 hover:bg-red-600 ms-2"
                >
                  Cancle
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </dialog>
  )
}

export default ReportLinkModal