import React, { useEffect, useRef, useState } from 'react'
import { Link, useParams } from 'react-router-dom';

import QRCodeLink from '../components/QRCodeLink';
import UpdateLinkForm from '../components/UpdateLinkForm';
import LinkChart from '../components/LinkChart';
import LinkInfo from '../components/LinkInfo';
import useLinkManager from '../hooks/useLinkManager';

import { FaLink } from "react-icons/fa";
import GlobalNotFound from './GlobalNotFound';

const UserLinkStats = () => {

  const { linkId } = useParams()
  const { loading, linkStats, getLinkStats } = useLinkManager()
  const [refetch, setRefetch] = useState(false)
  const containerRef = useRef(null)

  useEffect(() => {
    getLinkStats(linkId)
  }, [linkId, refetch])

  const handleRefetch = () => {
    setRefetch(prev => !prev)
    containerRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className='max-w-7xl mx-auto my-6 p-2 min-h-dvh' ref={containerRef}>
      <div className="p-4 bg-base-200 rounded-box shadow-md">
        <h2 className="text-2xl font-bold flex items-center gap-2 mb-8 px-6 py-4 border-b border-b-base-content/20">
          <FaLink className='text-amber-500' />
          Link Detailes & Analytics
        </h2>
        {
          loading &&
          <div className="mx-auto w-max">
            <span className="loading loading-lg loading-bars"></span>
          </div>
        }
        {
          !loading && !linkStats && <GlobalNotFound />
        }
        {
          linkStats &&
          <>
            <div className="w-full max-w-5xl mx-auto flex flex-col lg:flex-row gap-4">
              <div className="">
                <QRCodeLink link={linkStats.link} />
              </div>
              <div className="flex-1">
                <LinkInfo link={linkStats.link} />
              </div>
            </div>
            <div className="divider max-w-5xl mx-auto"></div>
            <div className="w-full max-w-5xl mx-auto grid grid-cols-1 gap-4 items-center lg:grid-cols-2">
              <UpdateLinkForm link={linkStats.link} onRefetch={handleRefetch} />
              <LinkChart />
            </div>
          </>
        }
      </div>
    </section>
  )
}

export default UserLinkStats