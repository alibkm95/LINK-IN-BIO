import React, { useEffect, useRef, useState } from 'react'
import { QRCodeSVG } from 'qrcode.react'
import { toPng } from 'html-to-image'
import toast from 'react-hot-toast';

import FallbackProfile from '../assets/profile.svg'

import { FaShareAltSquare } from "react-icons/fa";
import { FaCopy } from "react-icons/fa6";
import { FaDownload } from "react-icons/fa6";
import { getCurrentDomain } from '../utils/utils';

const QRCodeProfile = ({ user }) => {
  const [URL, setURL] = useState('')
  const [showURL, setShowURL] = useState(false)
  const QRCodeRef = useRef(null)

  useEffect(() => {
    if (user) {
      const currentDomain = getCurrentDomain()
      setURL(`${currentDomain}/u/${user.username}`)
    }
  }, [user])

  const handleShareURL = async () => {
    try {
      await navigator.share({ url: URL })
    } catch (error) {
      toast.error('You browser dose not support sharing URL. Try to copy it.')
    }
  }

  const handleCopyURL = async () => {
    try {
      await navigator.clipboard.writeText(URL)
      toast.success('URL copied !')
    } catch (error) {
      setShowURL(true)
      toast.error('Copy failed! Your browser does not support copying or prevents access to the system clipboard. Try copying manually.')
    }
  }

  const handleDownloadQRCode = () => {
    if (QRCodeRef.current) {
      toPng(QRCodeRef.current)
        .then((dataURL) => {
          const link = document.createElement('a')
          link.download = `QR-Code_${user.username}.png`
          link.href = dataURL
          link.click()
        })
        .catch((error) => {
          toast.error('Download QR-Code failed!')
        })
    }
  }

  return (
    <div className={`flex flex-col items-center justify-center gap-2`}>
      <div className={`rounded-box overflow-hidden shadow-lg min-w-48 min-h-48 ${!user ? 'skeleton ' : ''}`} ref={QRCodeRef}>
        {
          user &&
          <QRCodeSVG
            value={URL}
            size={200}
            level={"H"}
            includeMargin={true}
            imageSettings={{
              src: user.profileImg ? `api/file/profile/${user.profileImg}` : FallbackProfile,
              height: 40,
              width: 40,
              borderRadius: 2000,
              excavate: true,
            }}
          />
        }
      </div>
      <div className="flex flex-col items-center gap-2 mt-2">
        {
          user &&
          <>
            <input
              type="text"
              className={`input input-bordered input-sm w-full max-w-xs ${!showURL ? 'hidden' : ''}`}
              value={URL}
              readOnly
              name='URL-input'
            />
            <div className='flex items-center gap-4'>
              <button className="btn btn-square btn-sm btn-ghost text-xl text-pink-600" title='Share' onClick={handleShareURL}>
                <FaShareAltSquare />
              </button>
              <button className="btn btn-square btn-sm btn-ghost text-xl text-amber-600" title='Copy' onClick={handleCopyURL}>
                <FaCopy />
              </button>
              <button className="btn btn-square btn-sm btn-ghost text-xl text-indigo-600" title='Download' onClick={handleDownloadQRCode}>
                <FaDownload />
              </button>
            </div>
          </>
        }
      </div>
    </div>
  )
}

export default QRCodeProfile