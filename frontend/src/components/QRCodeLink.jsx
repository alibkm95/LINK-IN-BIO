import React from 'react'
import { QRCodeSVG } from 'qrcode.react'

import { FaShareAltSquare } from "react-icons/fa";
import { FaCopy } from "react-icons/fa6";
import { FaDownload } from "react-icons/fa6";

const QRCodeLink = () => {
  return (
    <div className={`flex flex-col items-center justify-center gap-2`}>
      <div className="rounded-box overflow-hidden shadow-lg">
        <QRCodeSVG
          value={"https://picturesofpeoplescanningqrcodes.tumblr.com/"}
          size={200}
          level={"L"}
          includeMargin={true}
        />
      </div>
      <div className="flex items-center gap-1">
        <button className="btn btn-square btn-ghost text-xl text-pink-600" title='Share'>
          <FaShareAltSquare />
        </button>
        <button className="btn btn-square btn-ghost text-xl text-amber-600" title='Copy'>
          <FaCopy />
        </button>
        <button className="btn btn-square btn-ghost text-xl text-indigo-600" title='Download'>
          <FaDownload />
        </button>
      </div>
    </div>
  )
}

export default QRCodeLink