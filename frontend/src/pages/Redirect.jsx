import React, { useState } from 'react'

import ReportLinkModal from '../components/ReportLinkModal';

import RedirectSVG from '../assets/redirect.svg'

import { IoArrowRedoCircleSharp } from "react-icons/io5";
import { TiWarning } from "react-icons/ti";
import QRCodeLink from '../components/QRCodeLink';

const Redirect = () => {

  const [showAgeRestrictionAlert, setShowAgeRestrictionAlert] = useState(false)
  const [showReportModal, setShowReportModal] = useState(false)

  const domain = 'facebook.com' //temp

  return (
    <section className='max-w-6xl mx-auto my-6 p-2 min-h-dvh'>
      <div className="grid grid-cols-1 md:grid-cols-2 bg-base-200 rounded-box gap-4 shadow-xl p-4">
        <div className=''>
          <img src={RedirectSVG} alt="" />
        </div>
        <div className='flex flex-col items-center justify-center gap-4 text-center'>
          <div className="flex items-center gap-2">
            Loading ...
            <span className="loading loading-lg loading-bars"></span>
          </div>
          <p className="font-semibold text-2xl md:text-3xl">
            You are being redirect to:
          </p>
          <div className='text-blue-600 flex flex-col items-center gap-2'>
            <div className="w-10 h-10 min-w-10 min-h-10 rounded-full overflow-hidden bg-base-100 border border-primary">
              <img
                className='w-full h-full object-contain'
                src={`https://icon.horse/icon/${domain}`}
                alt="icon"
              />
            </div>
            <p className='text-start'>
              destination link ++++++++++++
            </p>
          </div>
          <p>
            The automatic redirection will lead you to destination link. if it not worked use button below.
          </p>
          <div className="flex items-center gap-2">
            <button
              className="btn btn-sm md:btn-md btn-primary text-white"
              onClick={() => { setShowAgeRestrictionAlert(prev => !prev) }}
            >
              Navigate to destination
              <IoArrowRedoCircleSharp className='md:text-2xl' />
            </button>
            <button
              className="btn btn-sm md:btn-md btn-square btn-error text-white"
              onClick={() => { setShowReportModal(true) }}
            >
              <TiWarning className='md:text-2xl' />
            </button>
          </div>
          <div className={`collapse ${showAgeRestrictionAlert ? 'collapse-open' : 'collapse-close'} w-full text-start`}>
            <div className="collapse-content">
              <p className='text-sm mb-2'>
                The destination link has an age restriction and may contain adults content. would you like to proceed?
              </p>
              <button className="btn btn-sm ms-1 bg-emerald-600 text-white hover:bg-emerald-700">
                Continue
              </button>
              <button
                className="btn btn-sm ms-1 bg-red-600 text-white hover:bg-red-700"
                onClick={() => { setShowAgeRestrictionAlert(false) }}
              >
                Cancle
              </button>
            </div>
          </div>
          <div>
            <QRCodeLink />
          </div>
        </div>
      </div>
      {
        showReportModal && <ReportLinkModal onCancel={() => { setShowReportModal(false) }} />
      }
    </section>
  )
}

export default Redirect