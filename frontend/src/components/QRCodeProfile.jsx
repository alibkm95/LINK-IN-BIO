import React from 'react'
import { QRCodeSVG } from 'qrcode.react'

import FallbackProfile from '../assets/profile.svg'

import { FaShareAltSquare } from "react-icons/fa";
import { FaCopy } from "react-icons/fa6";
import { FaDownload } from "react-icons/fa6";

const QRCodeProfile = ({ show }) => {
  return (
    <div className={`flex flex-col items-center justify-center gap-2 ${!show ? 'hidden' : 'flex'}`}>
      <div className="rounded-box overflow-hidden shadow-lg">
        <QRCodeSVG
          value={"https://picturesofpeoplescanningqrcodes.tumblr.com/"}
          size={200}
          level={"L"}
          includeMargin={true}
          imageSettings={{
            src: "https://static.zpao.com/favicon.png",
            height: 40,
            width: 40,
            borderRadius: 2000,
            excavate: true,
          }}
        />
      </div>
      <div className="flex items-center gap-1">
        <button className="btn btn-square text-xl text-pink-600" title='Share'>
          <FaShareAltSquare />
        </button>
        <button className="btn btn-square text-xl text-amber-600" title='Copy'>
          <FaCopy />
        </button>
        <button className="btn btn-square text-xl text-indigo-600" title='Download'>
          <FaDownload />
        </button>
      </div>
    </div>
  )
}

export default QRCodeProfile