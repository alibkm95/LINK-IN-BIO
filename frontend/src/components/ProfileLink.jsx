import React, { useState } from 'react'

import ReportLinkForm from './ReportLinkForm';

import { BsArrowUpRightSquareFill } from "react-icons/bs";
import { PiWarningFill } from "react-icons/pi";

const ProfileLink = ({ domain }) => {

  const [showRestrict, setShowRestrict] = useState(false)
  const [showReportForm, setShowReportForm] = useState(false)

  const toggleAgeRestrict = () => {
    setShowRestrict(prev => !prev)
  }

  const toggleReportForm = () => {
    setShowReportForm(prev => !prev)
  }

  return (
    <div className='p-4 rounded-box bg-base-300 shadow-lg'>
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full overflow-hidden bg-base-100 border border-primary">
          <img
            className='w-full h-full object-contain'
            src={`https://icon.horse/icon/${domain}`}
            alt="icon"
          />
        </div>
        <div className="flex-1">
          <div role='button' className="font-semibold link link-hover hover:text-blue-500">
            {domain}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="btn btn-square text-emerald-600" title='Redirect' onClick={toggleAgeRestrict}>
            <BsArrowUpRightSquareFill size={20} />
          </button>
          <button className="btn btn-square text-orange-500" title='Report link' onClick={toggleReportForm}>
            <PiWarningFill size={25} />
          </button>
        </div>
      </div>
      {/* the age restriction section */}
      <div className={`collapse ${showRestrict ? 'collapse-open pt-4' : 'collapse-close'}`}>
        <div className="collapse-content">
          <p className='text-sm'>
            The destination link you are looking for has an age limit set by its owner. The content of the destination link may contain adult content. Would you like to proceed?
          </p>
          <div className="mt-2">
            <button className="btn btn-sm text-white bg-emerald-500 hover:bg-emerald-600 ms-2">
              Continue
            </button>
            <button className="btn btn-sm text-white bg-red-500 hover:bg-red-600 ms-2">
              Cancle
            </button>
          </div>
        </div>
      </div>
      {/* the report form section */}
      <div className={`collapse ${showReportForm ? 'collapse-open pt-4' : 'collapse-close'}`}>
        <div className="collapse-content">
          <ReportLinkForm />
        </div>
      </div>
    </div>
  )
}

export default ProfileLink