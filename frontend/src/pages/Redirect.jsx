import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import useLinkManager from '../hooks/useLinkManager';

import ReportLinkModal from '../components/ReportLinkModal';
import QRCodeLink from '../components/QRCodeLink';
import GlobalNotFound from '../pages/GlobalNotFound'

import RedirectSVG from '../assets/redirect.svg'

import { IoArrowRedoCircleSharp } from "react-icons/io5";
import { TiWarning } from "react-icons/ti";
import { extractDomain } from '../utils/utils';

const Redirect = () => {

  const { short: shortId } = useParams()
  const { loading, redirectionLink, getRedirectInfo } = useLinkManager()
  const [showAgeRestrictionAlert, setShowAgeRestrictionAlert] = useState(false)
  const [showReportModal, setShowReportModal] = useState(false)
  const [URL, setURL] = useState('')
  const [counter, setCounter] = useState(10)

  useEffect(() => {
    if (shortId) getRedirectInfo(shortId)
  }, [shortId])

  useEffect(() => {
    if (redirectionLink) {
      setURL(extractDomain(redirectionLink.longLink))
      const intervalId = setInterval(() => {
        setCounter(prev => {
          if (prev > 0) {
            return prev - 1
          } else {
            clearInterval(intervalId)
            return 0
          }
        })
      }, 1000);
    }
  }, [redirectionLink])

  return (
    <section className='max-w-6xl mx-auto my-6 p-2 min-h-dvh'>
      {
        loading &&
        <div className="flex items-center justify-center gap-2">
          <span className="loading loading-lg loading-bars"></span>
        </div>
      }
      {
        !loading && !redirectionLink && <GlobalNotFound />
      }
      {
        redirectionLink &&
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 bg-base-200 rounded-box gap-4 shadow-xl p-4">
            <div>
              <img src={RedirectSVG} />
            </div>
            <div className='flex flex-col items-center justify-center gap-4 text-center'>
              <p className="font-semibold text-2xl md:text-3xl">
                You are being redirect to:
              </p>
              <div className='text-blue-600 flex flex-col items-center gap-2'>
                <img
                  className='w-16 h-16 object-contain rounded-box'
                  src={`https://www.google.com/s2/favicons?domain=${URL}&sz=256`}
                  alt="icon"
                />
                <p className='text-start'>
                  {redirectionLink.longLink}
                </p>
              </div>
              <p>
                After <span className='bg-gray-700/30 p-1 rounded'>{counter}</span> secounds.
              </p>
              <div className="flex items-center gap-2">
                {
                  redirectionLink.isAgeRestrict ?
                    (
                      <button
                        className="btn btn-sm md:btn-md btn-primary text-white"
                        onClick={() => { setShowAgeRestrictionAlert(true) }}
                        disabled={counter === 0 ? false : true}
                      >
                        Navigate to destination
                        <IoArrowRedoCircleSharp className='md:text-2xl' />
                      </button>
                    ) : (
                      <Link
                        to={redirectionLink.longLink}
                        target='_blank'
                        rel="noopener noreferrer"
                        className="btn btn-sm md:btn-md btn-primary text-white"
                        disabled={counter === 0 ? false : true}
                      >
                        Navigate to destination
                        <IoArrowRedoCircleSharp className='md:text-2xl' />
                      </Link>
                    )
                }
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
                  <Link
                    to={redirectionLink.longLink}
                    target='_blank'
                    rel="noopener noreferrer"
                    className="btn btn-sm ms-1 bg-emerald-600 text-white hover:bg-emerald-700"
                  >
                    Continue
                  </Link>
                  <button
                    className="btn btn-sm ms-1 bg-red-600 text-white hover:bg-red-700"
                    onClick={() => { setShowAgeRestrictionAlert(false) }}
                  >
                    Cancle
                  </button>
                </div>
              </div>
              <div>
                <QRCodeLink link={redirectionLink} />
              </div>
            </div>
          </div>
          {
            showReportModal && <ReportLinkModal onCancel={() => { setShowReportModal(false) }} linkId={redirectionLink._id} />
          }
        </>
      }
    </section >
  )
}

export default Redirect