import React from 'react'
import { Link } from 'react-router-dom';

import QRCodeLink from '../components/QRCodeLink';
import UpdateLinkForm from '../components/UpdateLinkForm';
import LinkChart from '../components/LinkChart';
import LinkInfo from '../components/LinkInfo';

import { FaLink } from "react-icons/fa";

const UserLinkStats = () => {
  return (
    <section className='max-w-7xl mx-auto my-6 p-2 min-h-dvh'>
      <div className="p-4 bg-base-200 rounded-box shadow-md">
        <h2 className="text-2xl font-bold flex items-center gap-2 mb-8 px-6 py-4 border-b border-b-base-content/20">
          <FaLink className='text-amber-500' />
          Link Detailes & Analytics
        </h2>
        <div className="mx-auto w-max">
          <span className="loading loading-lg loading-bars"></span>
        </div>
        <div className="w-full max-w-5xl mx-auto flex flex-col lg:flex-row gap-4">
          <div className="">
            <QRCodeLink />
          </div>
          <div className="flex-1">
            <LinkInfo />
          </div>
        </div>
        <div className="divider max-w-5xl mx-auto"></div>
        <div className="w-full max-w-5xl mx-auto grid grid-cols-1 gap-4 items-center lg:grid-cols-2">
          <UpdateLinkForm />
          <LinkChart />
        </div>
      </div>
    </section>
  )
}

export default UserLinkStats